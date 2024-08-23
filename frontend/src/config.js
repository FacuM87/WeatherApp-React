


const config = {
    env: process.env.REACT_APP_ENV || "production",
    weather_api_url: process.env.REACT_APP_API_URL,
    api_register_url: process.env.REACT_APP_API_REGISTER_URL,
    api_login_url: process.env.REACT_APP_API_LOGIN_URL,
    api_logout_url: process.env.REACT_APP_API_LOGOUT_URL,
    api_session_url: process.env.REACT_APP_API_SESSION_URL,
    api_google_login_url: process.env.REACT_APP_GOOGLE_LOGIN_URL
}

if (config.env === "production") {
    config.api_register_url = process.env.REACT_APP_PROD_API_REGISTER_URL;
    config.api_login_url = process.env.REACT_APP_PROD_API_LOGIN_URL;
    config.api_logout_url = process.env.REACT_APP_PROD_API_LOGOUT_URL;
    config.api_session_url = process.env.REACT_APP_PROD_API_SESSION_URL;
    config.api_google_login_url = process.env.REACT_APP_PROD_GOOGLE_LOGIN_URL
}

export default config

