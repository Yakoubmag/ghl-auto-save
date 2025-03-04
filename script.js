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

    // Fonction principale d'envoi à GoHighLevel
    function saveToGHL() {
        console.log("🚀 Fonction saveToGHL appelée !");

        const phoneField = document.querySelector(CONFIG.phoneSelector);
        const nameField = document.querySelector(CONFIG.nameSelector);
        const emailField = document.querySelector(CONFIG.emailSelector);

        console.log("Champs trouvés :", {
            phone: !!phoneField,
            name: !!nameField,
            email: !!emailField
        });

        if (!phoneField || !nameField || !emailField) {
            console.error("❌ Un ou plusieurs champs sont introuvables !");
            return;
        }

        const phoneNumber = phoneField.value.replace(/\D/g, "");
        
        console.log("Détails des champs :", {
            phoneValue: phoneField.value,
            phoneNumberLength: phoneNumber.length,
            nameValue: nameField.value,
            emailValue: emailField.value
        });

        // Ajout d'écouteurs sur tous les champs
        phoneField.addEventListener("change", handleFormChange);
        nameField.addEventListener("change", handleFormChange);
        emailField.addEventListener("change", handleFormChange);
        
        // Écouteur sur les inputs
        phoneField.addEventListener("input", handleFormChange);
        nameField.addEventListener("input", handleFormChange);
        emailField.addEventListener("input", handleFormChange);
    }

    function handleFormChange(event) {
        console.log("🔍 Changement détecté :", event.type, "sur", event.target);

        const phoneField = document.querySelector(CONFIG.phoneSelector);
        const nameField = document.querySelector(CONFIG.nameSelector);
        const emailField = document.querySelector(CONFIG.emailSelector);

        const phoneNumber = phoneField.value.replace(/\D/g, "");

        if (phoneNumber.length === 10 && 
            nameField.value.trim() && 
            emailField.value.trim()) {
            console.log("📞 Conditions remplies : Envoi automatique à GHL !");
            
            // Préparation et envoi des données (code précédent)
            const data = {
                "firstName": nameField.value || "Inconnu",
                "email": emailField.value || "no-email@example.com",
                "phone": phoneNumber,
                "locationId": CONFIG.locationId
            };

            console.log("🚀 Envoi des données à GoHighLevel...", data);

            fetch("https://rest.gohighlevel.com/v1/contacts/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${CONFIG.apiKey}`,
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
                alert("Votre contact a été enregistré avec succès !");
            })
            .catch(error => {
                console.error("❌ Erreur d'enregistrement dans GHL :", error);
                alert("Un problème est survenu lors de l'enregistrement. Veuillez réessayer.");
            });
        }
    }

    // Initialisation
    saveToGHL();
});
