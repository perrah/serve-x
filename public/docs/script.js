document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("overlay");
    const feedbackContainer = document.getElementById("feedback-container");

    
    setTimeout(() => {
        overlay.classList.add("hidden"); 
        feedbackContainer.style.visibility = "visible";
        feedbackContainer.style.opacity = "1"; 
    }, 2000); 

    fetchRecentFeedback();
});

async function fetchRecentFeedback() {
    try {
        const response = await fetch('http://localhost:8080/forms/feedbacks.php');
        const contentType = response.headers.get('Content-Type');

       
        if (!response.ok || !contentType.includes('application/json')) {
            const errorText = await response.text(); 
            throw new Error(`Unexpected response: ${errorText}`);
        }

        
        const feedback = await response.json(); 
        console.log('Parsed feedback:', feedback);

       
        const feedbackContainer = document.getElementById('recent-feedback');
        feedbackContainer.innerHTML = ''; 

        feedback.forEach(entry => {
            const feedbackItem = document.createElement('div');
            feedbackItem.className = 'feedback-item';
            feedbackItem.innerHTML = `
                <p><strong>${entry.name}</strong> (${new Date(entry.created_at).toLocaleString()})</p>
                <p>Rating: ${'⭐'.repeat(entry.star_rating)}</p>
                <p style='color:#000;'>${entry.comments}</p>
                <hr>
            `;
            feedbackContainer.appendChild(feedbackItem);
        });
    } catch (error) {
        console.error('Error fetching feedback:', error);
        const feedbackContainer = document.getElementById('recent-feedback');
        feedbackContainer.innerHTML = `<p>Unable to load feedback. Please try again later.</p>`;
    }
}
