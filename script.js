<script>
document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Script GoHighLevel chargé !");

    // Sélecteurs des 3 champs
    const phoneField = document.querySelector("#phone");
    const nameField = document.querySelector("#full_name");
    const emailField = document.querySelector('input[name="email"]');

    // Vérification qu'ils existent
    if (!phoneField || !nameField || !emailField) {
        console.error("❌ Un ou plusieurs champs sont introuvables : #phone, #full_name, input[name='email']");
        return;
    }

    // Fonction d'envoi à GoHighLevel
    function saveToGHL() {
        // Récupérer la valeur des champs
        const phoneNumber = phoneField.value.replace(/\D/g, "");
        const nameValue = nameField.value.trim();
        const emailValue = emailField.value.trim();

        // Vérifications
        if (phoneNumber.length < 10) {
            console.warn("❌ Numéro de téléphone incomplet !");
            return;
        }
        if (!nameValue || !emailValue) {
            console.warn("❌ Le nom ou l'email est manquant !");
            return;
        }

        // Données à envoyer
        const data = {
            "firstName": nameValue || "Inconnu",
            "email": emailValue || "no-email@example.com",
            "phone": phoneNumber,
            "locationId": "l82KH9dQABB0801TlZAw" // Ton locationId GoHighLevel
        };

        console.log("🚀 Envoi des données à GoHighLevel...", data);

        fetch("https://rest.gohighlevel.com/v1/contacts/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6Imw4MktIOWRRQUJCMDgwMVRsWkF3IiwiY29tcGFueV9pZCI6IjR5QnJuME0zMVlnUUNRc1M2bEhxIiwidmVyc2lvbiI6MSwiaWF0IjoxNzAxMTkwNzMzMTIwLCJzdWIiOiJ1c2VyX2lkIn0.f736MY_Iiq47r_KLbtLCepyHVFBRoxv7F1eyzmDuQEY`, // Ta clé API GHL
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
            // Optionnel: alert("Contact enregistré !");
        })
        .catch(error => {
            console.error("❌ Erreur d’enregistrement dans GHL :", error);
            // Optionnel: alert("Erreur lors de l'enregistrement.");
        });
    }

    // Vérification à chaque frappe dans l'un des 3 champs
    function checkAndSubmitForm() {
        const phoneNumber = phoneField.value.replace(/\D/g, "");
        const nameValue = nameField.value.trim();
        const emailValue = emailField.value.trim();

        console.log("🕵️ Vérification formulaire : ", {
            phoneNumber,
            nameValue,
            emailValue
        });

        // Condition : téléphone = 10 chiffres + nom non vide + email non vide
        if (phoneNumber.length === 10 && nameValue && emailValue) {
            console.log("✅ Tous les champs sont remplis, envoi à GHL !");
            saveToGHL();
        }
    }

    // Écouteur "input" sur chacun des 3 champs
    [phoneField, nameF
