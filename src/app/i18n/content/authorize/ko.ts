export const AUTHORIZE_KO = `
## /authorize란?

\`/authorize\` 명령은 Google, GitHub, Microsoft 같은 제3자 서비스를 OpenClaw AI 에이전트에 연결합니다. 연결이 완료되면 에이전트가 사용자를 대신하여 해당 서비스와 상호작용할 수 있습니다.

---

## 작동 방식

1. Telegram 채팅에서 \`/authorize\`를 보내세요
2. 버튼에서 제공업체를 선택하세요 (예: Google)
3. 에이전트가 요청을 수신하고 인증 링크를 보내줍니다
4. 링크를 클릭하고 제공업체에 로그인한 후 접근을 허용하세요
5. 토큰이 에이전트에 전달되어 \`OAUTH.md\`에 저장됩니다

이후 에이전트는 저장된 토큰을 사용하여 연결된 서비스에 접근할 수 있습니다.

---

## 사용 가능한 제공업체

다음 제공업체가 기본적으로 제공됩니다 (플랫폼에서 구성된 경우):

| Provider | What your agent can do |
|---|---|
| **Google** | Google Drive, Gmail, Calendar 및 기타 Google API에 접근 |
| **GitHub** | 리포지토리 읽기/쓰기, 이슈 관리, 풀 리퀘스트 |
| **Microsoft** | OneDrive, Outlook, Microsoft 365 API에 접근 |

제공업체 버튼이 표시되지 않으면 아직 구성되지 않은 것입니다.

---

## 사용자 정의 OAuth 앱

에이전트는 사용자의 앱 자격 증명을 사용하여 **모든 OAuth 제공업체**에 연결할 수도 있습니다. 다음과 같은 경우에 유용합니다:

- 공유 앱 대신 자체 OAuth 앱을 사용하고 싶은 경우
- 위에 나열되지 않은 제공업체에 연결해야 하는 경우 (예: Slack, GitLab, Bitbucket)
- 특정 OAuth 범위(scope)가 필요한 경우

### 사용자 정의 OAuth 앱 설정 방법

1. **OAuth 앱을 등록**하세요 (예: Google Cloud Console, GitHub Developer Settings)

2. **리다이렉트 URI**를 다음으로 설정하세요:
   \`\`\`
   https://router.xaiworkspace.com/oauth/callback
   \`\`\`

3. **에이전트에게 자격 증명을 알려주세요**. 다음과 같은 메시지를 보내세요:
   > GitHub용 OAuth를 설정해 줘. client ID는 \`your-client-id\`이고 client secret은 \`your-client-secret\`이야

4. 에이전트가 라우터를 호출하여 state 토큰을 생성하고, 인증 URL을 구성한 후 링크를 보내줍니다

5. 인증이 완료되면 토큰이 교환되어 에이전트 인스턴스의 \`OAUTH.md\`에 저장됩니다

### 내부 작동 원리

에이전트가 사용자 정의 OAuth 흐름을 시작하면 라우터의 \`/oauth/state\` 엔드포인트에 사용자의 \`clientId\`, \`clientSecret\`, \`tokenUrl\`을 전달하여 호출합니다. 라우터는 이를 클라이언트별로 저장하고, OAuth 제공업체가 콜백 URL로 리다이렉트할 때 사용합니다.

---

## 보안

- **OAuth 앱 시크릿은 라우터를 벗어나지 않습니다** -- 글로벌 제공업체의 경우 client secret은 AWS Secrets Manager에 저장되며 에이전트 인스턴스로 전송되지 않습니다
- **사용자 정의 자격 증명은 클라이언트별로 저장**되며 토큰 교환에만 사용됩니다
- **State 토큰은 10분 후 만료**되어 재생 공격을 방지합니다
- **토큰은 에이전트 인스턴스의 \`OAUTH.md\`에 로컬 저장**됩니다 -- 다른 사용자와 공유되지 않습니다

---

## 문제 해결

| Problem | Solution |
|---|---|
| 제공업체 버튼이 표시되지 않음 | 플랫폼에서 아직 OAuth 제공업체를 구성하지 않은 상태입니다 |
| "Your agent must be running" | 먼저 \`/start\`를 보내 인스턴스를 활성화하세요 |
| 인증 링크가 도착하지 않음 | 에이전트가 처리 중일 수 있습니다 -- 잠시 기다린 후 다시 시도하세요 |
| 링크 클릭 후 "State expired" | 링크가 만료되었습니다 (10분). \`/authorize\`를 다시 실행하세요 |
| 토큰 교환 실패 | 리다이렉트 URI가 정확히 일치하는지 확인하세요: \`https://router.xaiworkspace.com/oauth/callback\` |
`;
