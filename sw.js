'use strict';


/*
 * Service Worker für die Diagnose-PWA
 */


self.addEventListener(
  'install',
  event => {

    /*
     * Neue Version sofort übernehmen.
     */

    self.skipWaiting();

  }
);


self.addEventListener(
  'activate',
  event => {

    /*
     * Service Worker sofort für
     * bestehende Tabs aktivieren.
     */

    event.waitUntil(
      self.clients.claim()
    );

  }
);


/*
 * Klick auf eine Benachrichtigung.
 */

self.addEventListener(
  'notificationclick',
  event => {

    event.notification.close();


    event.waitUntil(

      self.clients.matchAll(
        {
          type: 'window',
          includeUncontrolled: true
        }
      )
      .then(
        clients => {

          /*
           * Wenn die PWA bereits geöffnet ist:
           * vorhandenes Fenster verwenden.
           */

          for (const client of clients) {

            if ('focus' in client) {

              return client.focus();

            }

          }


          /*
           * Sonst PWA öffnen.
           */

          if (self.clients.openWindow) {

            return self.clients.openWindow(
              './index.html'
            );

          }

        }
      )

    );

  }
);
