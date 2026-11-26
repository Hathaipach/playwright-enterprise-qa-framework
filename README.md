# Enterprise QA Framework — คู่มือภาษาไทย

## เริ่มต้นบน Mac
ติดตั้ง Node.js 22 และ Git แล้วเปิดโฟลเดอร์ใน VS Code
```sh
npm install
npx playwright install chromium webkit
npm run typecheck
npm test
npm run report
```
ระบบจะเปิดเว็บจำลองบน localhost:4173 อัตโนมัติ ไม่ต้องสมัครบัญชี ผลที่คาดหวัง 8 executions (UI 2 x 3 projects + API 2) ยังไม่ได้ยืนยันการรันเต็มใน environment ที่สร้างไฟล์นี้

## โครงสร้าง
- pages: encapsulate UI locators/actions; assertions อยู่ใน test
- fixtures: inject page object และ API client ตามที่ test ต้องการ; built-in page/request จัดการ lifecycle
- tests/ui และ tests/api: AAA = Arrange, Act, Assert
- data: expected business values ไม่เก็บข้อมูลลับ
- config: ตรวจ environment และ URL; SIT/UAT ต้องมีระบบที่ใช้ contract เดียวกับ demo หรือแก้ adapter
- demo: เว็บและ API จำลอง ไม่ใช่ production application
- .github/workflows: CI ตรวจ type, run test, upload report

## คำสั่ง
```sh
npm run smoke
npx playwright test --project=mobile-webkit
npx playwright test --project=api
npx playwright test --ui
npx playwright test --debug
```
Mobile เป็น browser emulation ไม่ใช่เครื่องจริงหรือ LINE WebView

## Git workflow
สร้าง empty repository บน GitHub แล้วรันในโฟลเดอร์นี้
```sh
git init -b main
npm install
git add .
git commit -m 'chore: initialize QA framework'
git remote add origin https://github.com/YOUR-USER/YOUR-REPO.git
git push -u origin main
git switch -c feature/QA-101-cart-tests
# แก้ไขไฟล์ test แล้วตรวจ npm run typecheck และ npm test
git add tests/
git commit -m 'test: extend cart coverage'
git push -u origin feature/QA-101-cart-tests
```
เปิด PR บน GitHub จาก feature เข้า main; ให้ reviewer ตรวจ code และ CI; squash merge เมื่อผ่าน จากนั้น `git switch main` และ `git pull --ff-only origin main`.
ตั้ง branch protection ให้ require PR, approval (ถ้ามี reviewer) และ qa-check status check ตามสิทธิ์ของ plan

## CI reproducibility
ตอนสร้าง ZIP ไม่สามารถเข้าถึง npm registry จึงยังไม่มี package-lock.json. หลัง npm install ให้ commit lockfile แล้วเปลี่ยน `npm install` ใน qa.yml เป็น `npm ci`. สำหรับ production ควร pin GitHub Actions ด้วย full commit SHA ที่ตรวจสอบแล้ว และอัปเดต dependencies ตามรอบ

## Environment และ secrets
`cp .env.example .env` แล้วแก้ค่าในเครื่องสำหรับ SIT/UAT ที่ได้รับอนุญาตเท่านั้น. สำหรับ CI ที่เข้าถึงระบบจริง ตั้ง GitHub Settings > Secrets and variables > Actions; ตัวอย่าง mapping ใน trusted workflow: `TEST_API_TOKEN: ${{ secrets.TEST_API_TOKEN }}`. ใช้ variables สำหรับ BASE_URL/API_BASE_URL. อย่าให้ secrets กับ untrusted PR. ไม่ต้องมี token สำหรับ demo. ไม่ commit .env, auth state, report หรือ trace. ตรวจ artifact ก่อนเผยแพร่เพราะอาจมีข้อมูลอ่อนไหว

## CI/CD
ตัวอย่างนี้เป็น CI quality gate ไม่ deploy application; ในงานจริง CD pipeline ของ application ต้องรอผล QA ตามนโยบายทีมก่อน deploy.

## เอกสารอ้างอิง
- https://playwright.dev/docs/best-practices
- https://playwright.dev/docs/test-fixtures
- https://playwright.dev/docs/test-projects
- https://playwright.dev/docs/api-testing
- https://playwright.dev/docs/ci-intro
- https://docs.github.com/en/actions/reference/security/secure-use
