<script>
document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Script GoHighLevel chargé !");

    // Récupération des champs
    const phoneField = document.querySelector("#phone");
    const nameField = document.querySelector("#full_name");
    const emailField = document.querySelector('input[name="email"]');

    // Vérifie que tous les champs existent
    if (!phoneField || !nameField || !emailField) {
        console.error("❌ Un ou plusieurs champs (phone, full_name, email) sont introuvables dans la page !");
        return;
    }

    // Fonction d'envoi des données à GoHighLevel
    function saveToGHL() {
        const phoneNumber = phoneField.value.replace(/\D/g, ""); // Supprime tout sauf les chiffres

        // Vérification stricte : 10 chiffres pour le téléphone
        if (phoneNumber.length < 10) {
            console.warn("❌ Numéro de téléphone incomplet !");
            return;
        }

        // Vérification nom et email
        if (!nameField.value.trim() || !emailField.value.trim()) {
            console.warn("❌ Le nom ou l'email est manquant !");
            return;
        }

        // Préparation des données
        const data = {
            "firstName": nameField.value.trim() || "Inconnu",
            "email": emailField.value.trim() || "no-email@example.com",
            "phone": phoneNumber,
            "locationId": "l82KH9dQABB0801TlZAw" // Remplace par ton locationId
        };

        console.log("🚀 Envoi des données à GoHighLevel...", data);

        fetch("https://rest.gohighlevel.com/v1/contacts/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6Imw4MktIOWRRQUJCMDgwMVRsWkF3IiwiY29tcGFueV9pZCI6IjR5QnJuME0zMVlnUUNRc1M2bEhxIiwidmVyc2lvbiI6MSwiaWF0IjoxNzAxMTkwNzMzMTIwLCJzdWIiOiJ1c2VyX2lkIn0.f736MY_Iiq47r_KLbtLCepyHVFBRoxv7F1eyzmDuQEY`, // Remplace par ta propre clé API
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            console.log("✅ Contact sauvegardé dans GHL", result);
            // Tu peux ajouter un alert ou autre ici
        })
        .catch(error => {
            console.error("❌ Erreur d’enregistrement dans GHL :", error);
            // Tu peux afficher un message d'erreur à l'utilisateur si besoin
        });
    }

    // Vérification du formulaire en direct (immédiat)
    function checkAndSubmitForm() {
        const phoneNumber = phoneField.value.replace(/\D/g, "");
        const isPhoneOK = (phoneNumber.length === 10);
        const isNameOK = !!nameField.value.trim();
        const isEmailOK = !!emailField.value.trim();

        // Log pour débogage (optionnel)
        console.log("🕵️ Vérification du formulaire :", {
            phone: phoneNumber,
            isPhoneOK,
            name: nameField.value,
            isNameOK,
            email: emailField.value,
            isEmailOK
        });

        // Si tout est rempli, on envoie immédiatement
        if (isPhoneOK && isNameOK && isEmailOK) {
            console.log("✅ Tous les champs sont remplis, envoi à GHL !");
            saveToGHL();
        }
    }

    // Écoute des événements "input" sur chaque champ
    [phoneField, nameField, emailField].forEach(champ => {
        champ.addEventListener("input", checkAndSubmitForm);
    });

    // Optionnel : vérification immédiate au chargement
    checkAndSubmitForm();
});
</script>
