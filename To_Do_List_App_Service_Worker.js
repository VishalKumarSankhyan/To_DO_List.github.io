var cacheName = 'To_Do_List';
var cachefiles = [
    'https://vishalkumarsankhyan.github.io/To_do_list.github.io/',/*url*/
    'https://vishalkumarsankhyan.github.io/To_do_list.github.io/index.html',
    'https://vishalkumarsankhyan.github.io/To_do_list.github.io/to_do_list_app_css.css',
    'https://vishalkumarsankhyan.github.io/To_do_list.github.io/to_do_list_app_js.js',
    
    'https://vishalkumarsankhyan.github.io/To_do_list.github.io/To_Do_List_App_Service_Worker.js',

    'https://vishalkumarsankhyan.github.io/To_do_list.github.io/to_do_list_app.ico',

    'https://vishalkumarsankhyan.github.io/To_do_list.github.io/to_do_list_app_icon_64X64.png',
    'https://vishalkumarsankhyan.github.io/To_do_list.github.io/to_do_list_app_icon_72X72.png',
    'https://vishalkumarsankhyan.github.io/To_do_list.github.io/to_do_list_app_icon_96X96.png',
    'https://vishalkumarsankhyan.github.io/To_do_list.github.io/to_do_list_app_icon_128X128.png',
    'https://vishalkumarsankhyan.github.io/To_do_list.github.io/to_do_list_app_icon_144X144.png',
    'https://vishalkumarsankhyan.github.io/To_do_list.github.io/to_do_list_app_icon_152X152.png',
    'https://vishalkumarsankhyan.github.io/To_do_list.github.io/to_do_list_app_icon_192X192.png',
    'https://vishalkumarsankhyan.github.io/To_do_list.github.io/to_do_list_app_icon_256X256.png',
    'https://vishalkumarsankhyan.github.io/To_do_list.github.io/to_do_list_app_icon_512X512.png'
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
