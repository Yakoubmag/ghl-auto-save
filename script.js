document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Script GoHighLevel chargé !");

    // Fonction pour envoyer les données à GoHighLevel
    window.saveToGHL = function() {
        let phoneField = document.querySelector("#phone");
        let nameField = document.querySelector("#full_name");
        let emailField = document.querySelector('input[name="email"]');

        if (!phoneField || !nameField || !emailField) {
            console.error("❌ Un ou plusieurs champs sont introuvables !");
            return;
        }

        let phoneNumber = phoneField.value.replace(/\D/g, ""); // Supprime tout sauf les chiffres

        if (phoneNumber.length < 10) {
            console.warn("❌ Numéro de téléphone incomplet !");
            return;
        }

        // Vérifier que tous les champs sont remplis
        if (!nameField.value.trim() || !emailField.value.trim()) {
            console.warn("❌ Le nom ou l'email est manquant !");
            return;
        }

        // Récupérer les données du formulaire
        let data = {
            "firstName": nameField.value || "Inconnu",
            "email": emailField.value || "no-email@example.com",
            "phone": phoneNumber,
            "locationId": "l82KH9dQABB0801TlZAw" // ID de ta localisation sur GoHighLevel
        };

        console.log("🚀 Envoi des données à GoHighLevel...", data);

        // Envoyer les données à GoHighLevel via API
        fetch("https://rest.gohighlevel.com/v1/contacts/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6Imw4MktIOWRRQUJCMDgwMVRsWkF3IiwiY29tcGFueV9pZCI6IjR5QnJuME0zMVlnUUNRc1M2bEhxIiwidmVyc2lvbiI6MSwiaWF0IjoxNzAxMTkwNzMzMTIwLCJzdWIiOiJ1c2VyX2lkIn0.f736MY_Iiq47r_KLbtLCepyHVFBRoxv7F1eyzmDuQEY`, // Remplace cette clé par ta propre clé API GoHighLevel
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json()) // Convertir la réponse en JSON
        .then(result => console.log("✅ Contact sauvegardé dans GHL", result))
        .catch(error => console.error("❌ Erreur d’enregistrement dans GHL :", error));
    };

    // Déclenchement automatique dès que 10 chiffres sont entrés dans le téléphone
    let phoneField = document.querySelector("#phone");
    let nameField = document.querySelector("#full_name");
    let emailField = document.querySelector('input[name="email"]');

    if (phoneField && nameField && emailField) {
        phoneField.addEventListener("input", function() {
            let phoneNumber = this.value.replace(/\D/g, ""); // Nettoyer le numéro

            // Déclenchement uniquement lorsque 10 chiffres sont entrés ET que le nom et l'email sont remplis
            if (phoneNumber.length === 10 && nameField.value.trim() && emailField.value.trim()) {
                console.log("📞 Numéro détecté avec 10 chiffres : Envoi automatique à GHL !");
                saveToGHL(); // Appel de saveToGHL() lorsque tout est rempli
            }
        });
    }
});
