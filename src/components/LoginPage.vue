<!-- Login pagina. Code van de alert, bij zowel template als script, is gemaakt m.b.v. ChatGPT4o -->

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Inloggen</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <img 
                class="logoLogin" 
                src="@/assets/logo REC-1.6.png" 
                alt="logo Real Estate Care" 
                width="350px"
            >
            <!-- Login simulatie -->
            <div class="centerContainer">
                <ion-grid class="loginGrid" :fixed="true">
                    <form class="loginForm">
                        <ion-row class="loginGridRow">
                            <ion-col>
                                <ion-item class="basicIonItem">
                                    <ion-input
                                        id="userNameInput"
                                        class="loginInput" 
                                        v-model="username" 
                                        type="text" 
                                        label="Gebruikersnaam" 
                                        label-placement="stacked" 
                                        placeholder="Vul gebruikersnaam in"
                                    ></ion-input>
                                </ion-item>                   
                            </ion-col>
                        </ion-row>
                        <ion-row class="loginGridRow">
                            <ion-col>
                                <ion-item class="basicIonItem">
                                    <ion-input
                                        id="passwordInput"
                                        class="loginInput" 
                                        v-model="password" 
                                        type="password" 
                                        label="Wachtwoord" 
                                        label-placement="stacked" 
                                        placeholder="Vul wachtwoord in"
                                    ></ion-input>
                                </ion-item>                   
                            </ion-col>
                        </ion-row>
                    </form>
                    <ion-row class="loginGridRow">
                        <ion-col>
                            <ion-button
                                class="visibleButton" 
                                expand="block" 
                                @click="login"
                            >Inloggen</ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
            <!-- Simulatie 2 way authentication verificatiecode -->
            <ion-alert 
                :is-open="showAlert"
                header="2FA Verificatie"
                message="Voer de verificatiecode in."
                :buttons="alertButtons"
                :inputs="alertInputs"
                @didDismiss="dismissAlert"
            ></ion-alert>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
    import { ref } from "vue";
    import { useRouter } from "vue-router";
    import { 
        IonPage, 
        IonHeader, 
        IonToolbar, 
        IonTitle, 
        IonContent, 
        IonGrid, 
        IonRow, 
        IonCol, 
        IonItem, 
        IonLabel, 
        IonInput, 
        IonButton, 
        IonAlert,
    } from "@ionic/vue";

    const username = ref("");
    const password = ref("");
    const showAlert = ref(false);
    const verificationCode = ref("");
    const router = useRouter();

    const alertInputs = [
        {
            name: "verificationCode",
            type: "text",
            placeholder: "Verificatiecode",
            value: verificationCode.value
        }
    ];

    const alertButtons = [
        {
            text: "Annuleren",
            role: "cancel",
            handler: () => dismissAlert()
        },
        {
            text: "OK",
            handler: (data) => verifyCode(data.verificationCode)
        }
    ];

    const login = () => {
        if (username.value === "demoaccount" && password.value === "demodemo123") { //Simuleer inlog
            showAlert.value = true; // Toon de alert voor 2FA
        } else {
            alert("Ongeldige inloggegevens");
        }
    };

    const dismissAlert = () => {
        showAlert.value = false;
    };

    const verifyCode = (code: string) => {
        if (code === "123456") { //Simuleer verificatiecode
            localStorage.setItem("user", JSON.stringify({ username: username.value }));
            dismissAlert();
            router.push("/tabs/actieve-taak");
        } else {
            alert("Ongeldige verificatiecode");
        }
    };
</script>

<style scoped>
    @import "../theme/styles.css";
    @import "../theme/variables.css";

    .loginGrid {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .loginGridRow {
        width: 100%;
    }

    .loginForm {
        width: 100%;
    }

    .logoLogin {
        display: block;
        margin: 3.125rem auto;
    }

    .basicIonItem {
        margin-bottom: 1rem;
        width: 100%; 
    }

    .loginInput {
        --placeholder-font-size: 1.5rem;
        color: var(--ion-color-secondcolor);
    }

    .visibleButton {
        margin-top: 1.25rem;
        margin-left: 1rem;
        margin-right: 1rem; 
    }
</style>