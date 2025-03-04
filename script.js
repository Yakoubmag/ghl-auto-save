document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Script GoHighLevel chargé !");

    window.saveToGHL = function() {
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

        // ✅ Vérifier si les trois conditions sont remplies
        if (firstName === "" || email === "" || phoneNumber.length < 10) {
            console.warn("⚠️ En attente de toutes les informations obligatoires...");
            return;
        }

        let data = {
            "firstName": firstName,
            "email": email,
            "phone": phoneNumber,
            "locationId": "l82KH9dQABB0801TlZAw"
        };

        console.log("🚀 Envoi des données à GHL...", data);

        fetch("https://rest.gohighlevel.com/v1/contacts/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6Imw4MktIOWRRQUJCMDgwMVRsWkF3IiwiY29tcGFueV9pZCI6IjR5QnJuME0zMVlnUUNRc1M2bEhxIiwidmVyc2lvbiI6MSwiaWF0IjoxNzAxMTkwNzMzMTIwLCJzdWIiOiJ1c2VyX2lkIn0.f736MY_Iiq47r_KLbtLCepyHVFBRoxv7F1eyzmDuQEY`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => console.log("✅ Contact sauvegardé dans GHL", result))
        .catch(error => console.error("❌ Erreur d’enregistrement :", error));
    };

    // ✅ Déclencher `saveToGHL()` uniquement quand prénom, email et téléphone sont remplis
    function checkAndSave() {
        let nameField = document.querySelector("#full_name");
        let emailField = document.querySelector('input[name="email"]');
        let phoneField = document.querySelector("#phone");

        if (!nameField || !emailField || !phoneField) return;

        let phoneNumber = phoneField.value.replace(/\D/g, "");
        let firstName = nameField.value.trim();
        let email = emailField.value.trim();

        if (firstName !== "" && email !== "" && phoneNumber.length >= 10) {
            console.log("✅ Toutes les informations sont remplies, enregistrement automatique !");
            saveToGHL();
        }
    }

    // ✅ Ajouter des écouteurs d'événements aux trois champs
    ["input", "change"].forEach(event => {
        document.querySelector("#full_name")?.addEventListener(event, checkAndSave);
        document.querySelector('input[name="email"]')?.addEventListener(event, checkAndSave);
        document.querySelector("#phone")?.addEventListener(event, checkAndSave);
    });
});
