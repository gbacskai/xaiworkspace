#!/bin/bash
# Run this in AWS CloudShell with the aws_amplify_docflow4 profile
# Grants Device Farm permissions to the profile's IAM user/role

set -euo pipefail

PROJECT_ARN="arn:aws:devicefarm:us-west-2:695829630004:project:34d45d4e-2bd1-4a07-b217-e8796c1b4802"
ACCOUNT_ID="695829630004"
POLICY_NAME="xAIWorkspace-DeviceFarm-Policy"

echo "Creating IAM policy: ${POLICY_NAME}..."

POLICY_ARN=$(aws iam create-policy \
  --policy-name "${POLICY_NAME}" \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "DeviceFarmAccess",
        "Effect": "Allow",
        "Action": [
          "devicefarm:GetProject",
          "devicefarm:ListDevicePools",
          "devicefarm:GetDevicePool",
          "devicefarm:CreateDevicePool",
          "devicefarm:CreateUpload",
          "devicefarm:GetUpload",
          "devicefarm:ScheduleRun",
          "devicefarm:GetRun",
          "devicefarm:ListRuns",
          "devicefarm:ListJobs",
          "devicefarm:ListSuites",
          "devicefarm:ListTests",
          "devicefarm:ListArtifacts",
          "devicefarm:GetAccountSettings"
        ],
        "Resource": [
          "'"${PROJECT_ARN}"'",
          "arn:aws:devicefarm:us-west-2:'"${ACCOUNT_ID}"':*"
        ]
      }
    ]
  }' \
  --query 'Policy.Arn' --output text 2>/dev/null) || {
    echo "Policy may already exist. Fetching ARN..."
    POLICY_ARN="arn:aws:iam::${ACCOUNT_ID}:policy/${POLICY_NAME}"
  }

echo "Policy ARN: ${POLICY_ARN}"

# Detect if we're running as a user or role
CALLER=$(aws sts get-caller-identity --output json)
CALLER_ARN=$(echo "${CALLER}" | python3 -c "import sys,json; print(json.load(sys.stdin)['Arn'])")

if echo "${CALLER_ARN}" | grep -q ":user/"; then
  USERNAME=$(echo "${CALLER_ARN}" | sed 's|.*/||')
  echo "Attaching policy to IAM user: ${USERNAME}..."
  aws iam attach-user-policy \
    --user-name "${USERNAME}" \
    --policy-arn "${POLICY_ARN}"
elif echo "${CALLER_ARN}" | grep -q ":role/"; then
  ROLE_NAME=$(echo "${CALLER_ARN}" | sed 's|.*role/||')
  echo "Attaching policy to IAM role: ${ROLE_NAME}..."
  aws iam attach-role-policy \
    --role-name "${ROLE_NAME}" \
    --policy-arn "${POLICY_ARN}"
else
  echo "Could not detect user/role. Attach this policy manually: ${POLICY_ARN}"
fi

echo ""
echo "Done! Device Farm permissions granted."
echo "Test with: aws devicefarm get-project --arn ${PROJECT_ARN} --region us-west-2"
