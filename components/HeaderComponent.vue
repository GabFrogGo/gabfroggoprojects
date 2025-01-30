<template>
    <header>
        <div class="header-content">
            <NuxtLink :to="`${$config.public.baseURL}make`">
                <div class="content-boxes">
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
            </NuxtLink>
            <NuxtLink :to="`${$config.public.baseURL}`">
                <div class="content-boxes">
                    <img src="../assets//QLBuddy.webp" width="50" alt="QList">
                </div>
            </NuxtLink>
            <NuxtLink :to="`${$config.public.baseURL}tos`">
                <div class="content-boxes">
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-slash">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M17 5l-10 14" />
                    </svg>
                    Info
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-slash">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M17 5l-10 14" />
                    </svg>
                </div>
            </NuxtLink>
        </div>
    </header>
</template>