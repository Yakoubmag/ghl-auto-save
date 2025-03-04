<script>
document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Script GoHighLevel chargé !");

    const phoneField = document.querySelector("#phone");
    const nameField = document.querySelector("#full_name");
    const emailField = document.querySelector('input[name="email"]');

    if (!phoneField || !nameField || !emailField) {
        console.error("❌ Un ou plusieurs champs (phone, full_name, email) sont introuvables !");
        return;
    }

    function saveToGHL() {
        const phoneNumber = phoneField.value.replace(/\D/g, "");

        // Vérification stricte
        if (phoneNumber.length < 10) {
            console.warn("❌ Numéro de téléphone incomplet !");
            return;
        }
        if (!nameField.value.trim() || !emailField.value.trim()) {
            console.warn("❌ Le nom ou l'email est manquant !");
            return;
        }

        const data = {
            "firstName": nameField.value.trim() || "Inconnu",
            "email": emailField.value.trim() || "no-email@example.com",
            "phone": phoneNumber,
            "locationId": "l82KH9dQABB0801TlZAw" // Ton locationId
        };

        console.log("🚀 Envoi des données à GoHighLevel...", data);

        fetch("https://rest.gohighlevel.com/v1/contacts/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`, // Ta clé API
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
            // Optionnel : alert("Contact sauvegardé !");
        })
        .catch(error => {
            console.error("❌ Erreur d’enregistrement dans GHL :", error);
        });
    }

    // Vérifie à chaque frappe sur n’importe lequel des champs
    function checkAndSubmitForm() {
        const phoneNumber = phoneField.value.replace(/\D/g, "");
        const isPhoneOK = (phoneNumber.length === 10);
        const isNameOK = !!nameField.value.trim();
        const isEmailOK = !!emailField.value.trim();

        console.log("🕵️ Vérification formulaire : ", {
            phoneNumber,
            isPhoneOK,
            name: nameField.value.trim(),
            isNameOK,
            email: emailField.value.trim(),
            isEmailOK
        });

        // Si tous les champs sont corrects, envoi immédiat
        if (isPhoneOK && isNameOK && isEmailOK) {
            console.log("✅ Tous les champs sont remplis, envoi à GHL !");
            saveToGHL();
        }
    }

    // Écoute "input" sur chacun des champs
    [phoneField, nameField, emailField].forEach(champ => {
        champ.addEventListener("input", checkAndSubmitForm);
    });

    // Optionnel : vérifier dès le chargement
    checkAndSubmitForm();
});
</script>
