<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Inloggen</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <img class="logoLogin" src="@/assets/logo REC-1.6.png" alt="logo-afbeelding" width=350px>
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-item>
                            <ion-input v-model="username" type="text" label="Gebruikersnaam" label-placement="stacked" placeholder="Vul gebruikersnaam in"></ion-input>
                        </ion-item>                   
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-item>
                            <ion-input v-model="password" type="password" label="Wachtwoord" label-placement="stacked" placeholder="Vul wachtwoord in"></ion-input>
                        </ion-item>                   
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-button class="aanmeldenButton" expand="block" @click="login">Inloggen</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';

    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const login = () => {
        if (username.value === 'admin' && password.value === 'admin') {
            localStorage.setItem('user', JSON.stringify({ username: username.value }));
            router.push('/tabs/tab1');
        } else {
            alert('Ongeldige inloggegevens');
        }
    };
</script>

<style scoped>
    ion-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        padding: 20px; 
    }

    .logoLogin {
        display: block;
        margin: 50px auto;
    }

    ion-content {
        padding-start: 20px;
        padding-end: 20px;
    }

    ion-item {
        margin-bottom: 15px;
        width: 100%; 
    }

    ion-input {
        --placeholder-font-size: 24px;
        color: rgb(41, 52, 57);
    }

    .aanmeldenButton {
        margin-top: 20px;
        margin-left: 15px;
        margin-right: 15px; 
        --background: rgb(0, 170, 162);
        --background-activated: rgb(92, 201, 195);
        --background-focused: rgb(92, 201, 195);
    }
</style>
