document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Script GoHighLevel chargé !");

    // Configuration à personnaliser
    const CONFIG = {
        locationId: "l82KH9dQABB0801TlZAw",
        apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6Imw4MktIOWRRQUJCMDgwMVRsWkF3IiwiY29tcGFueV9pZCI6IjR5QnJuME0zMVlnUUNRc1M2bEhxIiwidmVyc2lvbiI6MSwiaWF0IjoxNzAxMTkwNzMzMTIwLCJzdWIiOiJ1c2VyX2lkIn0.f736MY_Iiq47r_KLbtLCepyHVFBRoxv7F1eyzmDuQEY",
        phoneSelector: "#phone", 
        nameSelector: "#full_name", 
        emailSelector: 'input[name="email"]'
    };

    // Fonction de débogage pour vérifier les champs
    function debugFields() {
        const phoneField = document.querySelector(CONFIG.phoneSelector);
        const nameField = document.querySelector(CONFIG.nameSelector);
        const emailField = document.querySelector(CONFIG.emailSelector);

        console.log("🕵️ Débogage des champs :");
        console.log("Champ téléphone trouvé :", !!phoneField);
        console.log("Champ nom trouvé :", !!nameField);
        console.log("Champ email trouvé :", !!emailField);

        // Log des valeurs
        if (phoneField) console.log("Valeur téléphone :", phoneField.value);
        if (nameField) console.log("Valeur nom :", nameField.value);
        if (emailField) console.log("Valeur email :", emailField.value);
    }

    // Fonction principale d'envoi à GoHighLevel
    function saveToGHL() {
        console.log("🚀 Fonction saveToGHL appelée !");
        debugFields(); // Ajout de logs de débogage

        const phoneField = document.querySelector(CONFIG.phoneSelector);
        const nameField = document.querySelector(CONFIG.nameSelector);
        const emailField = document.querySelector(CONFIG.emailSelector);

        // Validation des champs
        if (!phoneField || !nameField || !emailField) {
            console.error("❌ Un ou plusieurs champs sont introuvables !");
            return;
        }

        // Nettoyage du numéro de téléphone
        const phoneNumber = phoneField.value.replace(/\D/g, "");
        
        console.log("📞 Nombre de chiffres du téléphone :", phoneNumber.length);
        console.log("Nom :", nameField.value.trim());
        console.log("Email :", emailField.value.trim());

        // Vérifications
        if (phoneNumber.length < 10) {
            console.warn("❌ Numéro de téléphone incomplet !");
            return;
        }

        if (!nameField.value.trim() || !emailField.value.trim()) {
            console.warn("❌ Le nom ou l'email est manquant !");
            return;
        }

        // Le reste du code reste identique...
    }

    // Déclenchement automatique
    const phoneField = document.querySelector(CONFIG.phoneSelector);
    const nameField = document.querySelector(CONFIG.nameSelector);
    const emailField = document.querySelector(CONFIG.emailSelector);

    if (phoneField && nameField && emailField) {
        phoneField.addEventListener("input", function() {
            const phoneNumber = this.value.replace(/\D/g, "");
            
            console.log("📞 Événement input - Nombre de chiffres :", phoneNumber.length);
            console.log("Nom :", nameField.value.trim());
            console.log("Email :", emailField.value.trim());

            // Déclenchement si 10 chiffres ET nom et email remplis
            if (phoneNumber.length === 10 && 
                nameField.value.trim() && 
                emailField.value.trim()) {
                console.log("📞 Conditions remplies : Envoi automatique à GHL !");
                saveToGHL();
            }
        });
    } else {
        console.error("❌ Un ou plusieurs champs n'ont pas été trouvés !");
        debugFields();
    }
});
