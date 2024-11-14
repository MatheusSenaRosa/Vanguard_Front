type Messages = { [key: string]: string };

export const ptbr = {
  errors: {
    authentication: {
      signIn: (error: string) => {
        const messages: Messages = {
          "Email or password is invalid": "Email ou senha inválido.",
        };

        return messages[error];
      },
      signUp: (error: string) => {
        const messages: Messages = {
          "This email is already in use": "Este email já está em uso.",
          "Recaptcha is invalid": "Recaptcha inválido.",
        };

        return messages[error];
      },
      forgotPassword: (error: string) => {
        const messages: Messages = {
          "User not found": "Este usuário não existe.",
        };

        return messages[error];
      },
      resetPassword: (error: string) => {
        const messages: Messages = {
          "Token is invalid or expired": "Token inválido ou expirado.",
        };

        return messages[error];
      },
      changePassword: (error: string) => {
        const messages: Messages = {
          "Current password is invalid": "A senha atual é inválida.",
        };

        return messages[error];
      },
    },
    posts: {
      comments: {
        report: (error: string) => {
          const messages: Messages = {
            "You have already reported this comment": "Você já reportou esse comentário",
            "You have already reported this reply": "Você já reportou esse comentário",
          };

          return messages[error];
        },
      },
    },
    me: {
      activateAccount: (error: string) => {
        const messages: Messages = {
          "This user is already active": "Sua conta já está ativa.",
          "This token is invalid": "Código inválido.",
          "This token is expired": "Código expirado.",
        };

        return messages[error];
      },
      resendEmail: (error: string) => {
        const messages: Messages = {
          "This user is already active": "Sua conta já está ativa.",
        };

        return messages[error];
      },
    },
  },
};
