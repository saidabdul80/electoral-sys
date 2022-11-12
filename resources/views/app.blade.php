<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title inertia>{{ config('app.name', 'Laravel') }}</title>
    <script>
        window.Laravel = 
        {!!
            json_encode([
            'csrfToken' => csrf_token(),
            'user' => auth()->user(),
            'pusherKey' => config('broadcasting.connections.pusher.key'),
                ])
        !!};
</script>
    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap">
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap");

        :root {
            --header-height: 3rem;
            --nav-width: 68px;
            --first-color: #4723D9;
            --first-color-light: #AFA5D9;
            --white-color: #F7F6FB;
            --body-font: 'Nunito', sans-serif;
            --normal-font-size: 1rem;
            --z-fixed: 100
        }

        *,
        ::before,
        ::after {
            box-sizing: border-box
        }

        body {
            position: relative;
            margin: var(--header-height) 0 0 0;
            padding: 0 1rem;
            font-family: var(--body-font);
            font-size: var(--normal-font-size);
            transition: .5s
        }

        a {
            text-decoration: none
        }

        .header {
            width: 100%;
            height: var(--header-height);
            position: fixed;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 1rem;
            background-color: var(--white-color);
            z-index: var(--z-fixed);
            transition: .5s
        }

        .header_toggle {
            color: var(--first-color);
            font-size: 1.5rem;
            cursor: pointer
        }

        .header_img {
            width: 35px;
            height: 35px;
            display: flex;
            justify-content: center;
            border-radius: 50%;
            overflow: hidden
        }

        .header_img img {
            width: 40px
        }

        .l-navbar {
            position: fixed;
            top: 0;
            left: -60%;
            /* width: var(--nav-width); */
            height: 100vh;
            background-color: var(--first-color);
            padding: .5rem 1rem 0 0;
            transition: .5s;
            z-index: var(--z-fixed)
        }

        .nav {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            overflow: hidden
        }

        .nav_logo,
        .nav_link {
            display: flex;
            grid-template-columns: max-content max-content;
            align-items: center;
            column-gap: 1rem;
            padding: .5rem 0 .5rem 1.5rem
        }

        .nav_logo {
            margin-bottom: 2rem
        }

        .nav_logo-icon {
            font-size: 1.25rem;
            color: var(--white-color)
        }

        .nav_logo-name {
            color: var(--white-color);
            font-weight: 700
        }

        .nav_link {
            position: relative;
            color: var(--first-color-light);
            /* margin-bottom: 1.5rem; */
            padding: 9px 0px;
            transition: .3s;
            text-decoration: none;

        }

        .nav_link:hover {
            color: var(--white-color)
        }

        .nav_icon {
            font-size: 1.25rem
        }

        .show {
            left: 0
        }
        .bg_primary{
            background:rgba(46,73, 99, .4) !important;
        }
        .text_primary{
            color:rgb(46 73 99) !important;
        }
        .body-pd {
            padding-left: calc(var(--nav-width) + 73px);            
        }
      
        #body-pd{
            padding-top:64px;
            transition: .5s;
        }

        .active {
            color: var(--white-color);  
            position: relative;          
        }

        .active::before {
            content: '';
            position: absolute;
            display: block;
            left: 0;            
            width: 2px;
            height: 100%;            
            background: white;
        }
        .active::after {
            content: '';
            position: absolute;        
            left: 0;            
            width: 100%;
            height: 100%;   
            background: #fff2;
        }

        .activex {            
            position: relative;     
            background-color: #3333;     
            color:#333;
        }

        .activex::before {
            content: '';
            position: absolute;
            display: block;
            left: 0;            
            width: 2px;
            height: 100%;            
            background: #333;
        }

        .height-100 {
            height: 100vh
        }

       /*  @media screen and (max-width: 768px) {
            .header_toggle{
               position: fixed;
               z-index: 12;
               background-color: white;
               border-radius: 3px;           
            }

        } */

        @media screen and (min-width: 768px) {
        
            body {
                margin: calc(var(--header-height) + 1rem) 0 0 0;
                padding-left: calc(var(--nav-width) + 2rem)
            }

            .header {
                height: calc(var(--header-height) + 1rem);
                padding: 0 2rem 0 calc(var(--nav-width) + 3rem)
            }

            .header_img {
                width: 40px;
                height: 40px
            }

            .header_img img {
                width: 45px
            }
            .hidename{
                display: none;
            }
            .l-navbar {
                left: -20px;
                padding: 1rem 1rem 0 0;
            }

            .show {
              /*   width: calc(var(--nav-width) + 156px); */
                left:0px
            }

            .body-pdx {
                padding-left: calc(var(--nav-width) + 198px)
            }
            .ico-org{
                display: block;
                margin: 30px auto;
            }
        }
        .body-pdx {
                padding-left: calc(var(--nav-width) + 153px)
            }
    </style>
    <!-- Scripts -->
    @routes
    @vite('resources/js/app.js')
    @inertiaHead
</head>

<body class="font-sans antialiased bg-light">
    @inertia
    <script>
    </script>
</body>

</html>