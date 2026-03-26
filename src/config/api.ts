
export const API_ENDPOINTS = {
    AUTH: {
        CREATE_ACCOUNT: "/auth/create-account",
        LOGIN: "/auth/login",
        EMAIL_VERIFY: "/auth/email-verify",
        RESEND_OTP: "/auth/resend-otp",
        FORGOT_PASSWORD: "/auth/forgot-password",
        VERIFY_RESET_PASSWORD_OTP: "/auth/verify-reset-password-otp",
        RESET_PASSWORD: "/auth/reset-password",
        REFRESH_TOKEN: "/auth/refresh-token",
        GOOGLE_LOGIN: "/auth/google-login",
        GET_ME: "/users/me",
        // Add more auth endpoints here as needed
    },
    ADMIN: {
        ADD_ARTIST: "/artists",
        ADD_PRODUCT: "/products",
        UPDATE_ARTIST: "/artists",
        DELETE_ARTIST: "/artists",

        GET_PRODUCTS: "/products",
        UPDATE_PRODUCT: "/products",
        DELETE_PRODUCT: "/products",
        GET_INVENTORY: "/products/inventory",
        UPDATE_DEMO_STATUS: "/demos",
        PLANS: "/plans",
        TOTAL_STATS: "/analytics/total-stats",
        REVENUE_TRENDS: "/analytics/revenue-trends",
        BEST_SELLING_PRODUCTS: "/analytics/best-selling-products",
        CUSTOMER_DEMOGRAPHICS: "/analytics/customer-demographics",
        REVIEW_SENTIMENT: "/analytics/review-sentiment",
    },
    COMMON: {
        GET_ARTIST: "/artists",
        GET_SINGLE_ARTIST: "/artists",
        GET_PRODUCTS: "/products",
        GET_ALL_PRODUCTS: "/products",
        ADD_TO_WISHLIST: "/wishlist/toggle",
        GET_WHISH_LIST: "/wishlist",
        REVIEWS: "/reviews",
        GET_PRODUCT_REVIEWS: "/reviews/product",
        GET_ARTIST_REVIEWS: "/reviews/artist",
        GET_WEBSITE_REVIEWS: "/reviews/website",
        REVIEWS_ARTIST: "/reviews/artist",
        CREATE_WEBSITE_REVIEW: "/reviews/website",
        UPDATE_REVIEW: "/reviews",
    },
    CONTACT: {
        SUBMIT: "/contact/submit",
    },
    USER: {
        ADD_DEMO_ARTIST_SUBMISSION: "/demos/submit",
        GET_DEMO_ARTIST_SUBMISSION: "/demos",
        GET_SINGLE_DEMO_ARTIST_SUBMISSION: "/demos",
        APPROVE_DEMO_ARTIST_SUBMISSION: "/demos/approve",
        UPDATE_PROFILE: "/users/update-profile",
        USER_ACTIVITY: "/analytics/user-activity",
        SWITCH_ROLE: "/users/switch-role",
    },
    STORE: {
        CREATE: "/store/create",

    },

    CART: {
        GET_CART: "/cart",
        ADD_TO_CART: "/cart",
        UPDATE_CART: "/cart",
        REMOVE_FROM_CART: "/cart",
    },
    BILLING: {
        SUBSCRIBE: "/billing/subscribe",
        CONFIRM_PAYMENT: "/billing/confirm-payment",
        SUBSCRIPTION_STATUS: "/billing/subscription-status",
        HAS_ACTIVE_SUBSCRIPTION: "/billing/has-active-subscription",
        CANCEL_SUBSCRIPTION: "/billing/subscription/cancel",
    },
    SUBSCRIPTION_TEAMS: {
        MY_TEAM_STATUS: "/subscription-teams/my-team-status",
        TEAM_MEMBERS: (teamId: string) =>
            `/subscription-teams/${teamId}/members`,
        REMOVE_TEAM_MEMBER: (teamId: string, userId: string) =>
            `/subscription-teams/${teamId}/members/${userId}`,
    },
} as const;
