#!/bin/bash
# 알파콜라보 어드민 — 로컬 서버로 열기 (사이드바·헤더 정상 표시)
# 더블클릭하면 서버를 켜고 Chrome으로 대시보드를 엽니다.

PORT=8777
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR" || exit 1

# 이미 서버가 떠 있으면 재사용, 없으면 백그라운드로 기동
if curl -s -o /dev/null "http://localhost:${PORT}/dashboard.html"; then
  echo "서버가 이미 실행 중입니다 (포트 ${PORT})."
else
  echo "무캐시 로컬 서버를 시작합니다... (포트 ${PORT})"
  nohup python3 "$DIR/serve.py" "${PORT}" >/tmp/alpha-admin-server.log 2>/tmp/alpha-admin-server.err &
  sleep 1
fi

# Chrome으로 대시보드 열기
open -a "Google Chrome" "http://localhost:${PORT}/dashboard.html"
echo "Chrome에서 http://localhost:${PORT}/dashboard.html 를 열었습니다."
echo "이 창은 닫아도 됩니다."
