document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Script GoHighLevel chargé !");

    // Définition de la fonction saveToZapier
    window.saveToZapier = function() {
        let phoneField = document.querySelector("#phone");
        if (!phoneField) {
            console.error("❌ Champ téléphone introuvable !");
            return;
        }

        let phoneNumber = phoneField.value.replace(/\D/g, ""); // Supprime tout sauf les chiffres

        if (phoneNumber.length < 10) {
            console.warn("❌ Numéro de téléphone incomplet !");
            return;
        }

        let data = { // Définition de la variable `data` ici
            "firstName": document.querySelector("#full_name")?.value || "Inconnu",
            "email": document.querySelector('input[name="email"]')?.value || "no-email@example.com",
            "phone": phoneNumber
        };

        console.log("🚀 Envoi des données à Zapier...", data);

        fetch("https://hooks.zapier.com/hooks/catch/16715744/2q43id3/", { // Mets ton Webhook ici
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json()) // Si besoin de traiter la réponse
        .then(result => console.log("✅ Données envoyées à Zapier", result))
        .catch(error => console.error("❌ Erreur d’envoi à Zapier :", error));
    };

    // ✅ Déclenchement automatique dès que 10 chiffres sont entrés dans le téléphone
    let phoneField = document.querySelector("#phone");
    if (phoneField) {
        phoneField.addEventListener("input", function() {
            let phoneNumber = this.value.replace(/\D/g, ""); // Nettoyer le numéro

            if (phoneNumber.length === 10) { // Dès que 10 chiffres sont saisis
                console.log("📞 Numéro détecté avec 10 chiffres : Envoi automatique à Zapier !");
                saveToZapier(); // Envoi les données à Zapier
            }
        });
    }
});
