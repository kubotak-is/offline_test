/**
 * @fileoverview serviceWorker register
 */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js', {scope: './'})
        .then(registration => {
            // Success
            console.log('Service Worker Registered');
        }).catch(error => {
            // Error
            console.error(error);
    });
}
