var cacheName = 'To_Do_List';
var cachefiles = [
    '/',/*url*/
    'index.html',
    'to_do_list_app_css.css',
    'to_do_list_app_js.js',
    
    'To_Do_List_App_Service_Worker.js',

    'to_do_list_app.ico',

    'to_do_list_app_icon_64X64.png',
    'to_do_list_app_icon_72X72.png',
    'to_do_list_app_icon_96X96.png',
    'to_do_list_app_icon_128X128.png',
    'to_do_list_app_icon_144X144.png',
    'to_do_list_app_icon_152X152.png',
    'to_do_list_app_icon_192X192.png',
    'to_do_list_app_icon_256X256.png',
    'to_do_list_app_icon_512X512.png'
];

self.addEventListener("install", installEvent => {
    installEvent.waitUntill(
        caches.open(cacheName).then(cache => {
            cache.addAll(cachefiles)
        })
    )
})

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res=>{
            return res || fetch(fetchEvent.request)
        })
    )
});
