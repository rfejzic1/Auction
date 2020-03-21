import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv();

export default {
    API_URL: env.REACT_APP_API_URL,
    POLLING_TIME: 1_000
}
