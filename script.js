document.addEventListener("DOMContentLoaded", function() {
    console.log("🚀 Script GoHighLevel chargé !");
    window.saveToGHL = function() {
        let data = {
            "firstName": document.querySelector("#full_name")?.value || "",
            "email": document.querySelector('input[name="email"]')?.value || "",
            "phone": document.querySelector("#phone")?.value || "",
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
});
