document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Script GoHighLevel chargé et en attente d'entrée utilisateur...");

    function saveToGHL() {
        let nameField = document.querySelector("#full_name");
        let emailField = document.querySelector('input[name="email"]');
        let phoneField = document.querySelector("#phone");

        if (!phoneField) {
            console.error("❌ Champ téléphone introuvable !");
            return;
        }

        let phoneNumber = phoneField.value.replace(/\D/g, ""); // Supprime tout sauf les chiffres
        let firstName = nameField?.value.trim() || "";
        let email = emailField?.value.trim() || "";

        // ✅ Déclencher l'envoi uniquement si les trois champs sont remplis
        if (firstName === "" || email === "" || phoneNumber.length < 10) {
            console.warn("⚠️ En attente des informations obligatoires...");
            return;
        }

        let data = {
            "firstName": firstName,
            "email": email,
            "phone": phoneNumber,
            "locationId": "l82KH9dQABB0801TlZAw"
        };

        console.log("🚀 Envoi des données à GHL...", data);

        // 🔹 Modifications pour contourner le problème CORS
        fetch("https://rest.gohighlevel.com/v1/contacts/", {
            method: "POST",
            mode: "no-cors", // 🔹 Ajout de cette ligne pour désactiver la politique CORS
            headers: {
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6Imw4MktIOWRRQUJCMDgwMVRsWkF3IiwiY29tcGFueV9pZCI6IjR5QnJuME0zMVlnUUNRc1M2bEhxIiwidmVyc2lvbiI6MSwiaWF0IjoxNzAxMTkwNzMzMTIwLCJzdWIiOiJ1c2VyX2lkIn0.f736MY_Iiq47r_KLbtLCepyHVFBRoxv7F1eyzmDuQEY`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => console.log("✅ Contact envoyé à GHL (sans réponse)", response))
        .catch(error => console.error("❌ Erreur d’enregistrement :", error));
    }

    // ✅ Déclenchement automatique dès que 10 chiffres sont entrés
    let phoneField = document.querySelector("#phone");
    if (phoneField) {
        phoneField.addEventListener("input", function() {
            let phoneNumber = this.value.replace(/\D/g, ""); // Nettoyer le numéro

            if (phoneNumber.length >= 10) {
                console.log("📞 Numéro détecté avec 10 chiffres : Enregistrement automatique !");
                saveToGHL();
            }
        });
    }
});
