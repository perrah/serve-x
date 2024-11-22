document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedback-form');
    const modal = document.getElementById('response-modal');
    const closeModalButton = document.querySelector('.close-btn');
    const modalMessage = document.getElementById('modal-message');

    
    feedbackForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const formData = new FormData(feedbackForm);

        try {
            const response = await fetch('http://localhost:8080/forms/submit-feedback.php', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }

            const result = await response.json(); 
            modalMessage.textContent = result.message || 'Feedback submitted successfully!';
        } catch (error) {
            console.error('Error:', error);
            modalMessage.textContent = 'Failed to submit feedback. Please try again.';
        }

        modal.style.display = 'block';
    });

    
    closeModalButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

   
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
