<template>
    <div class="startbody">
        <div class="top-page">
            <img src="../assets/QLBuddy.webp" alt="QList" height="280">
            <h1>QList Generador Web</h1>
        </div>
        <div class="mid-page">
            <section class="options">
                <div class="options-container">
                    <NuxtLink :to="`${baseURL}make`">
                        <div class="boot-box">
                            <div class="option-presentation">
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 2 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-braces">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M7 4a2 2 0 0 0 -2 2v3a2 3 0 0 1 -2 3a2 3 0 0 1 2 3v3a2 2 0 0 0 2 2" />
                                </svg>
                                Make
                                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="12 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-braces">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M17 4a2 2 0 0 1 2 2v3a2 3 0 0 0 2 3a2 3 0 0 0 -2 3v3a2 2 0 0 1 -2 2" />
                                </svg>
                            </div>
                            <div class="option-description">
                                Crea tus propios códigos QR con tus reglas.
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </section>
        </div>
        <div class="bottom-page">
            Herramienta hecha con: <a href="https://nuxt.com/" referrerpolicy="no-referrer" rel="external" target="_blank">Nuxt</a>
            <a href="https://nuxt.com/" referrerpolicy="no-referrer" rel="external" target="_blank">
                <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-nuxt">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12.146 8.583l-1.3 -2.09a1.046 1.046 0 0 0 -1.786 .017l-5.91 9.908a1.046 1.046 0 0 0 .897 1.582h3.913" />
                    <path d="M20.043 18c.743 0 1.201 -.843 .82 -1.505l-4.044 -7.013a.936 .936 0 0 0 -1.638 0l-4.043 7.013c-.382 .662 .076 1.505 .819 1.505h8.086z" />
                </svg>
            </a>
        </div>
    </div>
</template>

<script setup>
    const config = useRuntimeConfig();
    const baseURL = config.public.app.baseURL || "/";

    useHead({
        title: 'QList-Web',
        meta: [
            { name: 'description', content: 'QList-Web es una herramienta hecha para la aplicación en desarrollo QList. Con esta herramienta puedes generar códigos QR tipo "JSON"' }
        ],
    })
</script>


<style lang="css">
    @import url(../assets/css/start.css);
</style>