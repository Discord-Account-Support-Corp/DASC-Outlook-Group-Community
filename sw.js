const CACHE_NAME = "dasc-transporter-v2";

const FILES = [
    "./",
    "./index.html",
    "./manifest.json",
    "./icon.png"
];


self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(FILES))
    );

    self.skipWaiting();

});


self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(cacheNames => {

            return Promise.all(

                cacheNames.map(cache => {

                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }

                })

            );

        })

    );

    self.clients.claim();

});


self.addEventListener("fetch", event => {

    event.respondWith(

        fetch(event.request)
        .then(response => {

            return response;

        })
        .catch(() => {

            return caches.match(event.request);

        })

    );

});
