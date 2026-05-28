(function () {
    'use strict';

    // Mobile navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            const isOpen = navLinks.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && navLinks.classList.contains('nav-open')) {
                navLinks.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Conference map
    const mapElement = document.getElementById('conference-map');
    if (!mapElement || typeof L === 'undefined') {
        return;
    }

    const conferenceLocations = [
        {
            lat: 43.0389,
            lng: -87.9065,
            city: 'Milwaukee, WI',
            conferences: ['Cyphercon']
        },
        {
            lat: 36.1699,
            lng: -115.1398,
            city: 'Las Vegas, NV',
            conferences: ['Def Con', 'BSides Las Vegas']
        },
        {
            lat: 59.3293,
            lng: 18.0686,
            city: 'Stockholm, Sweden',
            conferences: ['Sec-T']
        },
        {
            lat: 55.6761,
            lng: 12.5683,
            city: 'Copenhagen, Denmark',
            conferences: ['DrivingIT']
        },
        {
            lat: 51.5074,
            lng: -0.1278,
            city: 'London, UK',
            conferences: ['FWD:CloudSec Europe']
        },
        {
            lat: 41.8781,
            lng: -87.6298,
            city: 'Chicago, IL',
            conferences: ['ChiBrrCon', 'BSides312', 'ThotCon']
        },
        {
            lat: 41.5236,
            lng: -90.5776,
            city: 'Quad Cities, IA/IL',
            conferences: ['CornCon']
        },
        {
            lat: 43.1566,
            lng: -77.6088,
            city: 'Rochester, NY',
            conferences: ['BSides Rochester']
        },
        {
            lat: 44.9778,
            lng: -93.2650,
            city: 'Minneapolis, MN',
            conferences: ['SecretCon']
        }
    ];

    const map = L.map('conference-map', {
        scrollWheelZoom: false,
        worldCopyJump: true
    }).setView([45, -20], 3);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    const markerIcon = L.divIcon({
        className: 'map-marker',
        html: '<span aria-hidden="true"></span>',
        iconSize: [18, 18],
        iconAnchor: [9, 9]
    });

    const bounds = [];

    conferenceLocations.forEach(function (location) {
        const popupHtml =
            '<div class="map-popup">' +
            '<strong>' + location.city + '</strong>' +
            '<ul>' +
            location.conferences.map(function (name) {
                return '<li>' + name + '</li>';
            }).join('') +
            '</ul></div>';

        const marker = L.marker([location.lat, location.lng], { icon: markerIcon })
            .addTo(map)
            .bindPopup(popupHtml);

        bounds.push(marker.getLatLng());
    });

    if (bounds.length) {
        map.fitBounds(L.latLngBounds(bounds), { padding: [40, 40], maxZoom: 4 });
    }

    mapElement.addEventListener('click', function () {
        map.scrollWheelZoom.enable();
    });

    mapElement.addEventListener('mouseleave', function () {
        map.scrollWheelZoom.disable();
    });
})();
