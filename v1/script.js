// Replace this with your actual n8n webhook URL
const WEBHOOK_URL = 'https://oriented-turkey-star.ngrok-free.app/webhook-test/2807fb7e-1737-42b1-82f8-10adf8d2dcc2';

document.getElementById('infoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const company = document.getElementById('company').value;
    const linkedin = document.getElementById('linkedin').value || null;

    // Prepare data
    const data = {
        name: name,
        company: company,
        linkedin: linkedin
    };

    // Show loading, hide form and results
    document.getElementById('infoForm').style.display = 'none';
    document.getElementById('loadingSection').classList.remove('hidden');
    document.getElementById('resultSection').classList.add('hidden');
    document.getElementById('submitBtn').disabled = true;

    try {
        // Send POST request to webhook
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Get JSON response
        const result = await response.json();

        // Hide loading, show results
        document.getElementById('loadingSection').classList.add('hidden');
        document.getElementById('resultSection').classList.remove('hidden');

        // Display the JSON response
        document.getElementById('resultBox').value = JSON.stringify(result, null, 2);

    } catch (error) {
        // Handle errors
        document.getElementById('loadingSection').classList.add('hidden');
        document.getElementById('resultSection').classList.remove('hidden');
        document.getElementById('resultBox').value = `Error: ${error.message}`;
    } finally {
        // Re-enable form
        document.getElementById('infoForm').style.display = 'block';
        document.getElementById('submitBtn').disabled = false;
    }
});