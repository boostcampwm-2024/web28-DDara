# 1. 베이스 이미지 설정 (Node.js 18 버전 사용)
FROM node:18

# 2. 작업 디렉토리 설정 (백엔드 디렉토리)
WORKDIR /backend-app

# 3. root 폴더의 package.json, pnpm-lock.yaml, pnpm-workspace.yaml 파일을 복사
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# 4. pnpm을 설치
RUN npm install -g pnpm

# 5. 전체 의존성 설치 (root)
RUN pnpm install

# 6. backend 폴더를 컨테이너로 복사
COPY backend /backend-app/backend

# 7. 작업 디렉토리 backend로 이동
WORKDIR /backend-app/backend

# 8. backend 의존성 설치
RUN pnpm install

# 9. 백엔드 실행
CMD ["pnpm", "run", "dev"]

#10. 백엔드 포트 설정
EXPOSE 3001
