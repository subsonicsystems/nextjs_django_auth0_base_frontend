# nextjs_django_auth0_base_frontend
汎用的なWebアプリケーションを作成するプロジェクトです。  
Next.js / Django / Auth0 / Material UIを組み合わせています。

このリポジトリはフロントエンドです。  
バックエンドは  
https://github.com/subsonicsystems/nextjs_django_auth0_base_backend  
です。

# 設定
## 事前準備
[バックエンド](https://github.com/subsonicsystems/nextjs_django_auth0_base_backend)の設定を行います。

## Auth0コンソール
1. Applications | Application
    - [+ Create Application]をクリックします
2. Create application
    - `Name` アプリケーション名を入力します
    - `Regular Web Applications`を選択します
    - [Create]をクリックします
3. Settingsタブをクリックします
4. Application URIs
    - `Allowed Callback URLs` Callback URLを設定します
      - 例: http://localhost:3000/api/auth/callback
    - `Allowed Logout URLs` ログアウト後にリダイレクトするURLを設定します
      - 例: http://localhost:3000/loggedOut
5. [Save Changes]をクリックします

## .env.localの作成
- プロジェクトルートに`.env.local`を作成します
- `AUTH0_POST_LOGOUT_REDIRECT` Auth0コンソールのApplications | Applications | Settings | Application URIs | Allowed Callback URLsの`Allowed Logout URLs`
- `AUTH0_AUDIENCE` Auth0コンソールのApplications | APIsの`API Audience`
  - [バックエンド](https://github.com/subsonicsystems/nextjs_django_auth0_base_backend)で設定します
- `AUTH0_SCOPE` 例: 'openid offline_access'
- `MESSAGE_URL` バックエンドのAPIのURL
  - 例: 'http://localhost:8000/api/private'
