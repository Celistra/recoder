<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/lucide@0.544.0/dist/umd/lucide.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        :root {
            --primary-color: #c084fc;
            --secondary-color: #a855f7;
            --dark-color: #1e1b4b;
            --light-color: #f5f3ff;
            --border-color: #7e22ce;
            --bg-gradient: linear-gradient(135deg, #1e1b4b 0%, #2e1065 50%, #4338ca 100%);
        }

        body {
            font-family: 'Inter', sans-serif;
            background: var(--bg-gradient);
            color: var(--light-color);
            overflow-x: hidden;
            min-height: 100vh;
        }

        #particles-js {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: -1;
        }

        .language-selector {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            gap: 1.5rem;
        }

        .language-option {
            padding: 1.5rem 3rem;
            background-color: rgba(192, 132, 252, 0.15);
            border: 2px solid rgba(192, 132, 252, 0.3);
            border-radius: 1rem;
            cursor: pointer;
            transition: all 0.5s ease;
            font-size: 1.5rem;
            font-weight: 600;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
        }

        .language-option:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 35px -5px rgba(192, 132, 252, 0.3);
            background-color: rgba(192, 132, 252, 0.25);
            border-color: rgba(192, 132, 252, 0.5);
        }

        .profile-container {
            display: none;
            flex-direction: column;
            align-items: center;
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
            position: relative;
            width: 90%;
        }
        
        .profile-container.show {
            animation: fadeInUp 0.8s ease-out forwards;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .profile-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 3rem;
            padding: 2rem;
            border: 2px solid rgba(192, 132, 252, 0.3);
            border-radius: 1.5rem;
            background-color: rgba(192, 132, 252, 0.1);
            width: 100%;
            max-width: 600px;
            transition: all 0.5s ease;
            backdrop-filter: blur(15px);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
        }

        .profile-header:hover {
            transform: translateY(-8px);
            box-shadow: 0 15px 35px -5px rgba(192, 132, 252, 0.2);
            border-color: rgba(192, 132, 252, 0.5);
        }

        .profile-avatar {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 1rem;
            border: 3px solid rgba(192, 132, 252, 0.5);
            transition: all 0.5s ease;
            box-shadow: 0 0 25px rgba(192, 132, 252, 0.4);
        }

        .profile-avatar:hover {
            transform: scale(1.05) translateY(-5px);
            box-shadow: 0 0 35px rgba(192, 132, 252, 0.6);
            border-color: rgba(192, 132, 252, 0.8);
        }

        .profile-name {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            color: var(--primary-color);
        }

        .profile-content {
            width: 100%;
            padding: 2rem;
            border: 2px solid rgba(192, 132, 252, 0.3);
            border-radius: 1.5rem;
            background-color: rgba(192, 132, 252, 0.08);
            transition: all 0.5s ease;
            backdrop-filter: blur(15px);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
            max-width: 800px;
        }

        .profile-content:hover {
            box-shadow: 0 15px 35px -5px rgba(192, 132, 252, 0.2);
            border-color: rgba(192, 132, 252, 0.5);
            transform: translateY(-3px);
        }

        .profile-content p {
            margin-bottom: 1rem;
            line-height: 1.6;
            color: white;
            text-shadow: 0 0 5px rgba(192, 132, 252, 0.7);
            transition: all 0.3s ease;
            padding: 0.25rem 0;
        }
        
        .profile-content p:hover {
            transform: translateX(5px);
            text-shadow: 0 0 10px rgba(192, 132, 252, 0.9),
                         0 0 15px rgba(192, 132, 252, 0.7);
        }

        .profile-content a {
            color: var(--primary-color);
            text-decoration: none;
            border-bottom: 1px solid var(--primary-color);
            transition: all 0.3s ease;
        }

        .profile-content a:hover {
            color: #a78bfa;
            border-bottom-color: #a78bfa;
        }

        .accordion {
            width: 100%;
            margin-bottom: 1rem;
            border-radius: 0.75rem;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .accordion-header {
            padding: 1rem 1.5rem;
            background: linear-gradient(90deg, #ffffff, #c084fc);
            color: #000000;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s ease;
            position: relative;
            z-index: 10;
        }

        .accordion-header:hover {
            background: linear-gradient(135deg, #a855f7, #f3e8ff);
        }

        .accordion-icon {
            transition: transform 0.3s ease;
        }

        .accordion.active .accordion-icon {
            transform: rotate(180deg);
        }

        .accordion-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s ease;
            background: transparent;
            color: white;
        }
        
        .accordion-inner {
            max-height: 60vh;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch; /* iOS平滑滚动 */
            scrollbar-width: thin; /* Firefox */
            scrollbar-color: rgba(192, 132, 252, 0.5) rgba(30, 27, 75, 0.3); /* Firefox */
        }
        
        /* Chrome, Safari, Edge滚动条样式 */
        .accordion-inner::-webkit-scrollbar {
            width: 6px;
        }
        
        .accordion-inner::-webkit-scrollbar-track {
            background: rgba(30, 27, 75, 0.3);
            border-radius: 3px;
        }
        
        .accordion-inner::-webkit-scrollbar-thumb {
            background: rgba(192, 132, 252, 0.5);
            border-radius: 3px;
        }
        
        .accordion-inner::-webkit-scrollbar-thumb:hover {
            background: rgba(192, 132, 252, 0.7);
        }
        
        .accordion-inner {
            padding: 1rem 1.5rem;
            border: 2px solid rgba(192, 132, 252, 0.3);
            border-top: none;
            border-radius: 0 0 0.75rem 0.75rem;
            background: linear-gradient(135deg, rgba(30, 27, 75, 0.7), rgba(67, 56, 202, 0.7));
            backdrop-filter: blur(10px);
        }

        .accordion.active .accordion-content {
            max-height: 1000px;
        }

        .profile-card {
            display: flex;
            align-items: center;
            gap: 2rem;
            padding: 2rem;
            border-radius: 1.5rem;
            background: linear-gradient(135deg, #111827, #4c1d95);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
            backdrop-filter: blur(15px);
            border: 2px solid rgba(192, 132, 252, 0.3);
            width: 100%;
            max-width: 800px;
            margin-top: 2rem;
            transition: all 0.5s ease;
        }

        .profile-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px -5px rgba(192, 132, 252, 0.3);
            border-color: rgba(192, 132, 252, 0.5);
        }

        .profile-card-avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid rgba(192, 132, 252, 0.5);
            transition: all 0.5s ease;
            box-shadow: 0 0 25px rgba(192, 132, 252, 0.4);
        }

        .profile-card-avatar:hover {
            transform: scale(1.05);
            box-shadow: 0 0 35px rgba(192, 132, 252, 0.6);
            border-color: rgba(192, 132, 252, 0.8);
        }

        .profile-card-info {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .profile-card-name {
            font-size: 1.5rem;
            font-weight: 700;
            color: white;
        }

        .profile-card-link {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            background: linear-gradient(135deg, #c084fc, #a855f7);
            color: white;
            text-decoration: none;
            border-radius: 0.5rem;
            font-weight: 600;
            transition: all 0.3s ease;
            align-self: flex-start;
            margin-top: 0.5rem;
            white-space: normal;
            text-align: center;
            line-height: 1.4;
        }

        .profile-card-link:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(192, 132, 252, 0.5);
        }

        .profile-card-mini-container {
            display: flex;
            gap: 1rem;
            width: 100%;
            max-width: 800px;
            margin-top: 1.5rem;
        }

        .profile-card-mini {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            border-radius: 1rem;
            background: linear-gradient(135deg, #111827, #4c1d95);
            box-shadow: 0 4px 16px 0 rgba(31, 38, 135, 0.2);
            backdrop-filter: blur(15px);
            border: 2px solid rgba(192, 132, 252, 0.3);
            flex: 1;
            transition: all 0.5s ease;
        }

        .profile-card-mini:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px -5px rgba(192, 132, 252, 0.3);
            border-color: rgba(192, 132, 252, 0.5);
        }

        .profile-card-avatar-mini {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid rgba(192, 132, 252, 0.5);
            transition: all 0.5s ease;
            box-shadow: 0 0 15px rgba(192, 132, 252, 0.4);
        }

        .profile-card-avatar-mini:hover {
            transform: scale(1.05);
            box-shadow: 0 0 25px rgba(192, 132, 252, 0.6);
            border-color: rgba(192, 132, 252, 0.8);
        }

        .profile-card-info-mini {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }

        .profile-card-name-mini {
            font-size: 1rem;
            font-weight: 700;
            color: white;
            margin: 0;
        }

        .profile-card-link-mini {
            display: inline-block;
            padding: 0.5rem 1rem;
            background: linear-gradient(135deg, #c084fc, #a855f7);
            color: white;
            text-decoration: none;
            border-radius: 0.375rem;
            font-weight: 600;
            transition: all 0.3s ease;
            font-size: 0.75rem;
            white-space: normal;
            text-align: center;
            line-height: 1.3;
        }

        .profile-card-link-mini:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(192, 132, 252, 0.5);
        }



        .back-button {
            position: fixed;
            top: 2rem;
            left: 2rem;
            padding: 0.75rem 1.5rem;
            background: linear-gradient(135deg, #f9a8d4, #ffffff);
            color: #4c1d95;
            border: none;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 4px 15px rgba(249, 168, 212, 0.3);
            z-index: 100;
            transform: translateZ(0); /* 启用硬件加速 */
        }

        .back-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(249, 168, 212, 0.5);
        }

        @media (max-width: 768px) {
            .language-selector {
                flex-direction: column;
                gap: 1rem;
            }

            .language-option {
                padding: 1rem 2rem;
                font-size: 1.2rem;
            }

            .profile-name {
                font-size: 1.5rem;
            }

            .profile-avatar {
                width: 120px;
                height: 120px;
            }
            
            /* 优化移动端布局 */
            .profile-container {
                padding: 1rem;
                padding-top: 4rem; /* 为返回按钮留出空间 */
                width: 95%;
                max-width: none;
            }
            
            .profile-header {
                margin-top: 2rem; /* 确保头像区域不被返回按钮遮挡 */
                padding: 1.5rem;
                width: 100%;
                max-width: none;
            }
            
            .profile-content {
                padding: 1rem;
                width: 100%;
                max-width: none;
            }
            
            .profile-content p {
                margin-bottom: 1.5rem;
                line-height: 1.8;
                font-size: 1.05rem;
            }
            
            .accordion-header {
                padding: 1rem 1.25rem;
                font-size: 0.95rem;
            }
            
            .accordion-inner {
                padding: 1.5rem;
                border-radius: 0 0 1rem 1rem;
            }
            
            .back-button {
                top: 1rem;
                left: 1rem;
                padding: 0.625rem 1.25rem;
                font-size: 0.875rem;
            }
            
            .profile-card-mini-container {
                flex-direction: column;
                gap: 1rem;
            }
            
            .profile-card-mini {
                padding: 0.875rem;
                gap: 0.75rem;
            }
            
            .profile-card-avatar-mini {
                width: 50px;
                height: 50px;
            }
            
            .profile-card-name-mini {
                font-size: 0.9375rem;
            }
            
            .profile-card-link-mini {
                padding: 0.4375rem 0.875rem;
                font-size: 0.75rem;
            }
        }
    </style>
</head>
<body>
    <div id="particles-js"></div>

    <div class="language-selector" id="languageSelector">
        <div class="language-option" data-language="zh">简体中文</div>
        <div class="language-option" data-language="zh-tw">繁體中文</div>
        <div class="language-option" data-language="en">English</div>
        <div class="language-option" data-language="ja">日本語</div>
    </div>

    <div class="profile-container" id="profileContainer">
        <button class="back-button" id="backButton" data-lang-zh="返回" data-lang-zh-tw="返回" data-lang-en="Back" data-lang-ja="戻る">返回</button>

        <div class="profile-content" id="profileContent">
            <p>这里是个人简介内容。你可以在JavaScript代码中修改这些文字。</p>
            <p>你也可以添加网址，例如：<a href="https://www.example.com" target="_blank">https://www.example.com</a>，它会自动变成可点击的链接。</p>
        </div>
        <div class="profile-card">
            <img src="Cel.jpg" alt="Celistria" class="profile-card-avatar">
            <div class="profile-card-info">
                <h2 class="profile-card-name">Celistria</h2>
                <a href="https://app.unifans.io/c/celistria" target="_blank" class="profile-card-link" data-lang-zh="点击跳转至Celistria的Unifans" data-lang-zh-tw="點擊跳轉至Celistria的Unifans" data-lang-en="Click to visit Celistria's Unifans" data-lang-ja="CelistriaのUnifansを訪問するにはクリック">点击跳转至Celistria的Unifans</a>
            </div>
        </div>
        <div class="profile-card-mini-container">
            <div class="profile-card-mini">
                <img src="lun.jpg" alt="Lunastria" class="profile-card-avatar-mini">
                <div class="profile-card-info-mini">
                    <h2 class="profile-card-name-mini">Lunastria</h2>
                    <a href="https://app.unifans.io/c/lunastria" target="_blank" class="profile-card-link-mini" data-lang-zh="点击跳转至Lunastria的Unifans" data-lang-zh-tw="點擊跳轉至Lunastria的Unifans" data-lang-en="Click to visit Lunastria's Unifans" data-lang-ja="LunastriaのUnifansを訪問するにはクリック">点击跳转至Lunastria的Unifans</a>
                </div>
            </div>
            <div class="profile-card-mini">
                <img src="aet.jpg" alt="Aetheria" class="profile-card-avatar-mini">
                <div class="profile-card-info-mini">
                    <h2 class="profile-card-name-mini">Aetheria</h2>
                    <a href="https://app.unifans.io/c/aetheria" target="_blank" class="profile-card-link-mini" data-lang-zh="点击跳转至Aetheria的Unifans" data-lang-zh-tw="點擊跳轉至Aetheria的Unifans" data-lang-en="Click to visit Aetheria's Unifans" data-lang-ja="AetheriaのUnifansを訪問するにはクリック">点击跳转至Aetheria的Unifans</a>
                </div>
            </div>
        </div>
        <div class="profile-card">
            <img src="kly.jpg" alt="Klyris" class="profile-card-avatar">
            <div class="profile-card-info">
                <h2 class="profile-card-name">Klyris</h2>
                <a href="https://app.unifans.io/c/klyris" target="_blank" class="profile-card-link" data-lang-zh="点击跳转至Klyris的Unifans" data-lang-zh-tw="點擊跳轉至Klyris的Unifans" data-lang-en="Click to visit Klyris' Unifans" data-lang-ja="KlyrisのUnifansを訪問するにはクリック">点击跳转至Klyris的Unifans</a>
            </div>
        </div>
        <div class="profile-card">
            <img src="van.jpg" alt="Vanity" class="profile-card-avatar">
            <div class="profile-card-info">
                <h2 class="profile-card-name">Vanity</h2>
                <a href="https://app.unifans.io/c/vanity" target="_blank" class="profile-card-link" data-lang-zh="点击跳转至Vanity的Unifans" data-lang-zh-tw="點擊跳轉至Vanity的Unifans" data-lang-en="Click to visit Vanity's Unifans" data-lang-ja="VanityのUnifansを訪問するにはクリック">点击跳转至Vanity的Unifans</a>
            </div>
        </div>
    </div>

    <script>
        // 个人信息配置
        const profileConfig = {
            avatar: "Cel.jpg", // 使用GitHub根目录的Cel.jpg图片文件
            name: {
                zh: "Celistria",
                "zh-tw": "Celistria",
                en: "Celistria",
                ja: "Celistria"
            },
            bio: {
                zh: `
                    <p>您好，这里是几位创作者们联合创作的一个网站，如果您是通过其它网站链接来到这里的，可以在下方点击跳转到我们每个人各自的Unifans。
但，如果您是第一次来到这里，在跳转至我们的Unifans之前，请<strong>务必阅读</strong>下方的注意事项，以确保您完全了解订阅后得到的sfmg格式文件是如何使用的。
（点击条目可展开）</p>
                    <p></p>
                    <div class="accordion">
                        <div class="accordion-header">
                            <div class="title-wrapper">
                                赞助文件介绍<span style="font-weight:bold; text-decoration:underline;">（赞助前请务必理解！！！）</span>
                            </div>
                            <span class="accordion-icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-inner">
                                <p>我们尽量简化了新增操作，用一句话概况——下载安装下方链接中的程序，选择您赞助后得到的文件后并输入'标签号'即可。</p>
                                <p>(等待时间根据设备性能不同；'标签号'可在各自作者的Unifans找到)</p>
                                <p></p>
                                <p>但是为了确保您的操作无误，请尽量看完下述三条详细说明。</p>
                                <p></p>
                                <p>（1）赞助文件格式说明：</p>
                                <p>在您赞助并且得到对应压缩包并解压后，您将得到一个包含许多".sfmg"格式文件的文件夹，其中每个sfmg文件对应一张'表图片'(壁纸图片)与一张'里图片'(您赞助真正得到的图片)，需要下载下方30/50MB的图片浏览器小软件才能打开。</p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/1-1.jpg" alt="GitHub Image" style="max-width: 100%; height: auto;"></p>
                                <p></p>
                                <p>（2）软件安装操作</p>
                                <p>请先下载下方链接中这个80MB的双端'Viewer'整合包，这是我们自制的一个图片浏览小软件。如果软件有bug可以留言给任何一位作者，我们会尝试更新。（当前仅支持：电脑端-Win；手机端-安卓(Android)，苹果用户请等待后续更新）</p>
                                <p>Viewer图片浏览程序下载地址：</p>
                                <p>-Catbox：<a href="https://files.catbox.moe/k4rp34.zip">https://files.catbox.moe/k4rp34.zip</a></p>
                                <p>-GoFile：<a href="https://gofile.io/d/rByC1X">https://gofile.io/d/rByC1X</a></p>
                                <p>-Mega：<a href="https://mega.nz/file/wKd3gLbJ#D_mj2bCvk_WH_077zF58DsGOpZWGvdhIa-el-mzsZh0">https://mega.nz/file/wKd3gLbJ#D_mj2bCvk_WH_077zF58DsGOpZWGvdhIa-el-mzsZh0</a></p>
                                <p>下载后，电脑端用户可以直接打开，无需其他操作；手机端用户需要安装，由于您在该软件的后续操作中需要选择文件夹，故请同意安装时的两个提示：'需要申请敏感权限'、'读取视频/图片文件权限'，这并不含有其它目的，且该软件是单机非联网的，也不会泄露信息。</p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/1-2.jpg" alt="GitHub Image" style="max-width: 100%; height: auto;"></p>
                                <p></p>
                                <p>（3）软件功能介绍</p>
                                <p>安装完毕后，打开时会看到语言选项"中/English"（电脑端在右下角，手机端在右上角），可以先切换对应语言。随后我将依次讲解其它选项的功能：</p>
                                <p>——"选择文件夹"：点击后，请选中您赞助的、在解压后包含了许多后缀为.sfmg文件的那个文件夹载入。载入文件这个过程根据不同性能的设备可能需要的时间不同，在此期间会比较卡顿，请勿退出。如果您的设备性能不足（近十几年买的应该都不会出现这种情况），可以尝试把一个文件夹里的文件拆分到多个文件夹中分批次查看，文件夹中的文件数量越少加载越快。</p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-1.jpg" alt="GitHub Image" style="max-width: 48%; height: auto; display: inline-block; margin-right: 2%;"><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-2.jpg" alt="GitHub Image" style="max-width: 48%; height: auto; display: inline-block;"></p>
                                <p>——"☆"：这个是切换表图片/里图片的按钮。</p>
                                <p>在加载图片后，您将看到所有的表图片及其缩略图，这些附赠的图片可以当作壁纸使用，与您赞助的内容无关。</p>
                                <p>随后，可以在我们的Unifans中找到类似于"标签：xxxxxx"样式的说明，这就是标签号，请把这个"xxxxxx"复制粘贴到☆旁边的输入框中，随后点击☆，此时您便可以自由浏览赞助获得的里图片了。</p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-3.jpg" alt="GitHub Image" style="max-width: 48%; height: auto; display: inline-block; margin-right: 2%;"><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-4.jpg" alt="GitHub Image" style="max-width: 48%; height: auto; display: inline-block;"></p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-5.jpg" alt="GitHub Image" style="max-width: 100%; height: auto;"></p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-6.jpg" alt="GitHub Image" style="max-width: 100%; height: auto;"></p>
                                <p>如果您确保了已经完全理解，可以点击下方我们各自的Unifans链接继续跳转至我们的Unifans，或者根据标题是否感兴趣阅读一下其它条目。</p>
                            </div>
                        </div>
                    </div>

                    <div class="accordion">
                        <div class="accordion-header">
                            <div class="title-wrapper">
                                测试用图片<span style="font-weight:bold; text-decoration:underline;">（请先用这组图片确保软件没有问题再进行赞助）</span>
                            </div>
                            <span class="accordion-icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-inner">
                                <p>下方是一个20张图片的.sfmg文件，标签码为111，在赞助之前请先使用这组图片测试软件是否可用，以防止赞助后无法看到图片。其中表图片为女仆肖像画、里图片为女仆壁纸。</p>
                                <p>测试用图片下载地址：</p>
                                <p>-Catbox：<a href="https://files.catbox.moe/a2ncxc.rar">https://files.catbox.moe/a2ncxc.rar</a></p>
                                <p>-GoFile：<a href="https://gofile.io/d/ONe1DM">https://gofile.io/d/ONe1DM</a></p>
                                <p>-Mega：<a href="https://mega.nz/file/UTdlgKbA#nlnHCRb5SfXKqvfGZVvJ1zfI81yWs_0J3OJqtq_kriQ">https://mega.nz/file/UTdlgKbA#nlnHCRb5SfXKqvfGZVvJ1zfI81yWs_0J3OJqtq_kriQ</a></p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/2-1-1.jpg" alt="GitHub Image" style="max-width: 100%; height: auto;"></p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="accordion">
                        <div class="accordion-header">
                            关于我们决定执行此修改的原因
                            <span class="accordion-icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-inner">
                                <p>对于此改动造成的不便我们在此道歉，但这也是出于无奈之举，因为近期我们发现频繁的有人在没有与我们进行任何沟通的情况下，开始私自将我们的指定的非公布作品上传到其它若干公开平台，并且我们后续与这些平台的沟通均极其麻烦，可以说如果动动手指就能上传的一组图，我们需要想办法提交许多信息，经过许久的审批，才能得到一个不知是否成功的结果。虽然这股苗头才刚起来，但为了防止后续雪球越滚越大，我们几个比较熟悉的创作者还是经商讨决定立即停更一段时间并做出对应措施。</p>
                                <p>事实上，我们并不反对您将我们的作品进行有限传播的分享，比如和您身边的朋友们私下传阅、在群里讨论，这些我们都是完全理解并且很欣慰的。</p>
                                <p>但问题就在于，一旦作品被传到开放的平台上去进行无限传播，事情就完全不受你我的控制了。仔细想想，这种行为看似和在群里公布也差不了太多，可实际上更本质的层面下呢？</p>
                                <p>开放平台对于除了平台管理者外的所有人都是不受控的，只要上传就会迅速被无数人下载、二次转载、甚至被一些人打包成资源包进行无成本的二次贩卖，而这和私下分享的本质区别就在这里。私下分享，本质上还是在一个有人情、有边界、扩散幅度有限的圈子里，大家知道作品来自谁，也知道什么能做、什么不该做；而开放平台是去中心化的，且流量巨大，它不会替任何人考虑成本，只会按照"热度、互动、可传播性"去推动内容流动，平台的管理者并不会真正的好心区分谁是支持者、谁是路人、谁是上传者，它只会根据数据表现去设置平台的死规则，分配曝光、引导流量，并在受到举报时以避免麻烦为主，而这些流量最终产生的收益，既不会回到创作者身上，也与上传者无关，更不会回馈给那些一直用实际行动支持我们的粉丝，而是去到了平台和二次传播的其他人身上。</p>
                                <p>在这个过程中，真正为作品付出时间、金钱、精力的支持者们与我们，反而成了最容易被伤害的一方——问题并不在于"有人免费分享"本身，而是在于这种分享被平台机制所接管后，就不再是站在我们用户一边的行为了，它最终服务的不是观众，也不是创作者，而是平台的流量逻辑。上传者可能是出于好意，我们能理解，但现实结果往往是，平台受益，二次传播者牟利，上传者没有任何分成，创作者要为此付出高额的沟通成本和风险，真正支持我们的粉丝们则要承担新内容缩水、停更、甚至最后消失的后果，就比如这次调整，可以说是我们断更了近乎一个月的主要原因。</p>
                                <p>我们并不是想把所有责任简单地推给某一方，而是想把这条链路讲清楚，在平台的复杂机制与放大效应下，此举最终会演变成对整个创作环境的长期伤害，而并非只是简单的普通分享。</p>
                            </div>
                        </div>
                    </div>

                    <div class="accordion">
                        <div class="accordion-header">
                            关于附赠的壁纸（表图片）与集成新账号 <span class="accordion-icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-inner">
                                <p>对于每个表图片我们都是按一般精细度的壁纸规格去做的，不过修图可能不会那么仔细，如果您感兴趣的话也可以找到附赠的压缩包下载壁纸原图，我们把每张壁纸单独放入了一个文件夹中，请按序号查收。此外，我们所有的表图片内容，也预计将会部分同步集中发布在一个新的账号中，不过这里只是顺带提及一嘴，防止您看到了我们的新账号因感到眼熟而感到困惑。</p>
                                <p>此外，出于谨慎起见，我们还计划会对Unifans中的名称与头像进行修改，所以如果您未来点击下方指定作者的Unifans后若发现头像/名称不对应，这是正常的，只要核对您想要解锁帖子的名称与日期（请以名称为准，我们并不确定日期是否会与p站那边偶尔出现一两天的偏差），若能与p站那边对应上，那么便没有问题。</p>
                                <p>最后，我们预计会在Unifans中也放上一个没有☆功能的viewer文件以便某些用户有着特殊的使用场景，因此如果您没有特殊需求请不要下载那个软件，防止无法查看到里图片。</p>
                            </div>
                        </div>                        
                    </div>

                    <div class="accordion">
                        <div class="accordion-header">
                            Viewer软件更新日志(最新更新：2025年12月26日23:22-UTC+8)： <span class="accordion-icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-inner">
                                <p>v0.1版本（最新版本）：</p>
                                <p>Win：</p>
                                <p>1、修复了图片在全屏模式下有质量损失的问题，现在浏览图片和png图片的质量完全相等</p>
                                <p>2、修复了切换图片卡顿的问题</p>
                                <p>3、新增了键盘上下键切换图片的功能</p>
                                <p>4、修复了在输入标签号后，点击其他位置无法退出输入框，继而无法左右键切换图片的问题（但目前仅能点击画布区域退出输入框）</p>
                                <p>————————————————————————</p>
                                <p>v0.2版本（正在制作中，如果遇到问题可以反馈给我们，我们会列在这里）：</p>
                                <p>Win：</p>
                                <p>1、正在尝试优化导入文件时的算法，继而减少导入文件时的卡顿时间</p>
                                <p>2、正在尝试添加”输入标签号后缩略图区域中的图片也会改为里图片“的优化</p>
                                <p>Android：</p>
                                <p>1、正在尝试大幅减少导入文件时的卡顿时间</p>
                                <p>2、正在尝试修复切换图片时会卡顿0.2s左右的问题</p>
                                <p>3、正在尝试添加”输入标签号后缩略图区域中的图片也会改为里图片“的优化</p>
                            </div>
                        </div>                        
                    </div>
                    
                `,
                en: `
                    <p>Hello, this is a website jointly created by several creators. If you came here through another website link, you can click below to jump to each of our individual Unifans.
However, if you are visiting here for the first time, before proceeding to our Unifans, please <strong>be sure to read</strong> the notes below to ensure you fully understand how to use the sfmg format files you will receive after subscribing.
(Click on the items to expand)</p>
                    <p></p>
                    <div class="accordion">
                        <div class="accordion-header">
                            <div class="title-wrapper">
                                Sponsor File Introduction <span style="font-weight:bold; text-decoration:underline;">(Please Understand Before Sponsoring!!!)</span>
                            </div>
                            <span class="accordion-icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-inner">
                                <p>We have tried to simplify the new addition process. In a nutshell—download and install the program from the link below, select the file you obtained after sponsoring, and then enter the 'Tag Number'.</p>
                                <p>(Waiting time varies depending on device performance; the 'Tag Number' can be found on each author's Unifans.)</p>
                                <p></p>
                                <p>However, to ensure you operate correctly, please try to read the following three detailed explanations.</p>
                                <p></p>
                                <p>（1）Sponsor File Format Explanation:</p>
                                <p>After you sponsor and receive the corresponding compressed package and extract it, you will get a folder containing many ".sfmg" format files. Each sfmg file corresponds to one 'Surface Image' (wallpaper image) and one 'Inner Image' (the actual image you sponsored for). You need to download the small 30/50MB image browser software below to open them.</p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/1-1.jpg" alt="GitHub Image" style="max-width: 100%; height: auto;"></p>
                                <p></p>
                                <p>（2）Software Installation Operation</p>
                                <p>Please first download the 80MB dual-end 'Viewer' integrated package from the link below. This is a small image browsing software we developed ourselves. If there are any bugs, you can leave a message to any author, and we will try to update it. (Currently only supports: PC - Win; Mobile - Android. Apple users please wait for future updates.)</p>
                                <p>Viewer Image Browsing Program Download Address:</p>
                                <p>-Catbox：<a href="https://files.catbox.moe/k4rp34.zip">https://files.catbox.moe/k4rp34.zip</a></p>
                                <p>-GoFile：<a href="https://gofile.io/d/rByC1X">https://gofile.io/d/rByC1X</a></p>
                                <p>-Mega：<a href="https://mega.nz/file/wKd3gLbJ#D_mj2bCvk_WH_077zF58DsGOpZWGvdhIa-el-mzsZh0">https://mega.nz/file/wKd3gLbJ#D_mj2bCvk_WH_077zF58DsGOpZWGvdhIa-el-mzsZh0</a></p>
                                <p>After downloading, PC users can open it directly without additional operations; mobile users need to install it. Since you will need to select a folder in the subsequent operations of this software, please agree to the two prompts during installation: 'Requires sensitive permissions' and 'Read video/image file permissions'. This has no other purpose, and the software is standalone and non-networked, and will not leak information.</p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/1-2.jpg" alt="GitHub Image" style="max-width: 100%; height: auto;"></p>
                                <p></p>
                                <p>（3）Software Function Overview</p>
                                <p>After installation, when opened, you will see the language option "中文/English" (bottom right on PC, top right on mobile). You can switch to the corresponding language first. Then I will explain the functions of the other options in order:</p>
                                <p>——"Select Folder": After clicking, please select the folder you sponsored that contains many .sfmg files after extraction to load. The loading process may take different amounts of time depending on the device performance, and the software may be laggy during this time. Please do not exit. If your device performance is insufficient (this should not happen for devices bought in the last decade or so), you can try splitting the files in one folder into multiple folders for batch viewing. The fewer files in a folder, the faster the loading.</p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-1.jpg" alt="GitHub Image" style="max-width: 48%; height: auto; display: inline-block; margin-right: 2%;"><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-2.jpg" alt="GitHub Image" style="max-width: 48%; height: auto; display: inline-block;"></p>
                                <p>——"☆": This is the button to switch between Surface Images and Inner Images.</p>
                                <p>After loading the images, you will see all the Surface Images and their thumbnails. These complimentary images can be used as wallpapers and are unrelated to the content you sponsored for.</p>
                                <p>Then, you can find instructions similar to "Tag: xxxxxx" on our Unifans. This is the Tag Number. Please copy and paste this "xxxxxx" into the input box next to ☆, then click ☆. At this point, you can freely browse the Inner Images obtained through sponsorship.</p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-3.jpg" alt="GitHub Image" style="max-width: 48%; height: auto; display: inline-block; margin-right: 2%;"><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-4.jpg" alt="GitHub Image" style="max-width: 48%; height: auto; display: inline-block;"></p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-5.jpg" alt="GitHub Image" style="max-width: 100%; height: auto;"></p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-6.jpg" alt="GitHub Image" style="max-width: 100%; height: auto;"></p>
                                <p>If you are sure you fully understand, you can click on our respective Unifans links below to continue to our Unifans, or read other entries based on your interest in the titles.</p>
                            </div>
                        </div>
                    </div>

                    <div class="accordion">
                        <div class="accordion-header">
                            <div class="title-wrapper">
                                Test Images<span style="font-weight:bold; text-decoration:underline;"> (Please test with these images to ensure the software works before sponsoring)</span>
                            </div>
                            <span class="accordion-icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-inner">
                                <p>Below is a .sfmg file with 20 images, with tag code 111. Before sponsoring, please test with these images to ensure the software works properly, to prevent being unable to view images after sponsoring. The surface images are maid portraits, and the inner images are maid wallpapers.</p>
                                <p>Test Images Download Address:</p>
                                <p>-Catbox：<a href="https://files.catbox.moe/a2ncxc.rar">https://files.catbox.moe/a2ncxc.rar</a></p>
                                <p>-GoFile：<a href="https://gofile.io/d/ONe1DM">https://gofile.io/d/ONe1DM</a></p>
                                <p>-Mega：<a href="https://mega.nz/file/UTdlgKbA#nlnHCRb5SfXKqvfGZVvJ1zfI81yWs_0J3OJqtq_kriQ">https://mega.nz/file/UTdlgKbA#nlnHCRb5SfXKqvfGZVvJ1zfI81yWs_0J3OJqtq_kriQ</a></p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/2-1-1.jpg" alt="GitHub Image" style="max-width: 100%; height: auto;"></p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="accordion">
                        <div class="accordion-header">
                            Regarding the Reason for Our Decision to Implement This Modification
                            <span class="accordion-icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-inner">
                                <p>We apologize for any inconvenience caused by this change, but it is also a necessary measure because recently we have found that frequently, without any communication with us, people have begun to privately upload our designated unpublished works to several other public platforms, and our subsequent communication with these platforms has been extremely troublesome. It can be said that for a set of images that can be uploaded with a flick of a finger, we need to find a way to submit a lot of information, go through a long approval process, and only then get a result that we don't know if it was successful. Although this trend has just started, to prevent the snowball from getting bigger later, several of our more familiar creators decided to immediately stop updating for a period of time and take corresponding measures after discussion.</p>
                                <p>In fact, we do not object to you sharing our works through limited dissemination, such as private circulation with your friends around you, or discussing them in groups. We fully understand and are very pleased with these.</p>
                                <p>But the problem is that once the work is uploaded to an open platform for unlimited dissemination, things are completely out of your and our control. Think carefully, this behavior seems not much different from publishing in a group, but what about at a more essential level?</p>
                                <p>Open platforms are uncontrolled for everyone except the platform managers. As long as they are uploaded, they will be quickly downloaded by countless people, re-posted, and even packaged into resource packs by some people for cost-free secondary sales. This is the essential difference from private sharing. Private sharing is essentially still in a circle with human touch, boundaries, and limited spread. Everyone knows who the work comes from and what can and cannot be done; while open platforms are decentralized and have huge traffic. They will not consider costs for anyone, and will only promote content flow according to "heat, interaction, and spreadability". The platform managers will not truly kindly distinguish between supporters, passers-by, and uploaders. They will only set rigid rules for the platform based on data performance, allocate exposure, guide traffic, and mainly avoid trouble when reported. The benefits ultimately generated by this traffic will neither return to the creators nor be related to the uploaders, nor will they be fed back to those fans who have always supported us with practical actions. Instead, they will go to the platform and others who spread it secondarily.</p>
                                <p>In this process, the supporters who truly spent time, money, and energy on the work, and us, have instead become the most vulnerable party - the problem is not with "someone sharing for free" itself, but that after this sharing is taken over by the platform mechanism, it is no longer an action that stands on the side of our users. It ultimately serves not the audience, nor the creators, but the platform's traffic logic. Uploaders may have good intentions, we can understand, but the reality is often that the platform benefits, secondary spreaders profit, uploaders get no share, creators have to pay high communication costs and risks for this, and fans who truly support us have to bear the consequences of new content shrinking, stopping updates, or even disappearing in the end. For example, this adjustment can be said to be the main reason why we stopped updating for almost a month.</p>
                                <p>We don't want to simply push all the responsibility onto a certain party, but want to make this chain clear. Under the platform's complex mechanisms and amplification effects, this action will eventually evolve into long-term damage to the entire creative environment, rather than just a simple ordinary sharing.</p>
                            </div>
                        </div>
                    </div>

                    <div class="accordion">
                        <div class="accordion-header">
                            Regarding the Bonus Wallpapers (Surface Images) and the New Integrated Account <span class="accordion-icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-inner">
                                <p>All surface images are created to standard wallpaper specifications with general finesse, though the retouching may not be as meticulous. If you are interested, you can also find the bonus compressed package to download the original wallpaper images. We have placed each wallpaper in its own individual folder, so please check them by sequence number. In addition, all of our surface image content is expected to be partially synchronized and centrally posted on a new account. This is just mentioned in passing to prevent you from feeling confused if you see our new account and find it familiar.</p>
                                <p>Furthermore, for caution's sake, we plan to modify the names and avatars in Unifans. Therefore, if in the future you click on the specified author's Unifans below and find that the avatar/name does not match, this is normal. As long as the name and date of the post you want to unlock (please prioritize the name, as we are not sure if the date may occasionally deviate by one or two days from Pixiv) correspond with those on Pixiv, then there is no issue.</p>
                                <p>Finally, we plan to also upload a viewer file without the ☆ function on Unifans for certain users with special usage scenarios. Therefore, if you do not have special needs, please do not download that software to avoid being unable to view the inner images.</p>
                            </div>
                        </div>
                    </div>

                    <div class="accordion">
                        <div class="accordion-header">
                            Viewer Software Update Log (Last Updated: Dec 26, 2025, 23:22 - UTC+8): <span class="accordion-icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-inner">
                                <p>v0.1 Version (Latest Version):</p> <p>Win</p> <p>1. Fixed the issue of image quality loss in full-screen mode; browsing quality is now identical to original PNG quality.</p> <p>2. Fixed the lag issue when switching images.</p> <p>3. Added the function to switch images using the keyboard up and down arrow keys.</p> <p>4. Fixed the issue where the input box could not be exited by clicking elsewhere after entering a tag number, preventing image switching via arrow keys (Currently, it can only be exited by clicking the canvas area).</p> <p>————————————————————————</p> <p>v0.2 Version (Under development; please provide feedback if you encounter any issues, which will be listed here):</p> <p>Win:</p> <p>1. Currently attempting to optimize the file import algorithm to reduce lag time during imports.</p> <p>2. Currently attempting to add an optimization where the image in the thumbnail area updates to the corresponding image after entering a tag number.</p> <p>Android:</p> <p>1. Currently attempting to significantly reduce lag time during file imports.</p> <p>2. Currently attempting to fix the issue where switching images causes a lag of about 0.2s.</p> <p>3. Currently attempting to add an optimization where the image in the thumbnail area updates to the corresponding image after entering a tag number.</p>
                            </div>
                        </div>                        
                    </div>
                `,
                "zh-tw": `
                    <p>您好，這裡是幾位創作者們聯合創作的一個網站，如果您是通過其它網站鏈接來到這裡的，可以在下方點擊跳轉到我們每個人各自的Unifans。
但，如果您是第一次來到這裡，在跳轉至我們的Unifans之前，請<strong>務必閱讀</strong>下方的注意事項，以確保您完全了解訂閱後得到的sfmg格式文件是如何使用的。
（點擊條目可展開）</p>
                    <p></p>
                    <div class="accordion">
                        <div class="accordion-header">
                            <div class="title-wrapper">
                            贊助文件介紹<span style="font-weight:bold; text-decoration:underline;">（贊助前請務必理解！！！）</span>
                            </div>
                            <span class="accordion-icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-inner">
                                <p>我們盡量簡化了新增操作，用一句話概況——下載安裝下方連結中的程式，選擇您贊助後得到的檔案後並輸入'標籤號'即可。</p>
                                <p>(等待時間根據設備性能不同；'標籤號'可在各自作者的Unifans找到)</p>
                                <p></p>
                                <p>但是為了確保您的操作無誤，請盡量看完下述三條詳細說明。</p>
                                <p></p>
                                <p>（1）贊助檔案格式說明：</p>
                                <p>在您贊助並且得到對應壓縮檔並解壓後，您將得到一個包含許多".sfmg"格式檔案的資料夾，其中每個sfmg檔案對應一張'表圖片'(壁紙圖片)與一張'裡圖片'(您贊助真正得到的圖片)，需要下載下方30/50MB的圖片瀏覽器小軟體才能打開。</p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/1-1.jpg" alt="GitHub Image" style="max-width: 100%; height: auto;"></p>
                                <p></p>
                                <p>（2）軟體安裝操作</p>
                                <p>請先下載下方連結中這個80MB的雙端'Viewer'整合包，這是我們自製的一個圖片瀏覽小軟體。如果軟體有bug可以留言給任何一位作者，我們會嘗試更新。（當前僅支援：電腦端-Win；手機端-安卓(Android)，蘋果用戶請等待後續更新）</p>
                                <p>Viewer圖片瀏覽程式下載地址：</p>
                                <p>-Catbox：<a href="https://files.catbox.moe/k4rp34.zip">https://files.catbox.moe/k4rp34.zip</a></p>
                                <p>-GoFile：<a href="https://gofile.io/d/rByC1X">https://gofile.io/d/rByC1X</a></p>
                                <p>-Mega：<a href="https://mega.nz/file/wKd3gLbJ#D_mj2bCvk_WH_077zF58DsGOpZWGvdhIa-el-mzsZh0">https://mega.nz/file/wKd3gLbJ#D_mj2bCvk_WH_077zF58DsGOpZWGvdhIa-el-mzsZh0</a></p>
                                <p>下載後，電腦端用戶可以直接打開，無需其他操作；手機端用戶需要安裝，由於您在該軟體的後續操作中需要選擇資料夾，故請同意安裝時的兩個提示：'需要申請敏感權限'、'讀取影片/圖片檔案權限'，這並不含有其他目的，且該軟體是單機非聯網的，也不會洩露資訊。</p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/1-2.jpg" alt="GitHub Image" style="max-width: 100%; height: auto;"></p>
                                <p></p>
                                <p>（3）軟體功能介紹</p>
                                <p>安裝完畢後，打開時會看到語言選項"中/English"（電腦端在右下角，手機端在右上角），可以先切換對應語言。隨後我將依次講解其他選項的功能：</p>
                                <p>——"選擇資料夾"：點擊後，請選中您贊助的、在解壓後包含了許多副檔名為.sfmg檔案的那個資料夾載入。載入檔案這個過程根據不同性能的設備可能需要不同的時間，在此期間會比較卡頓，請勿退出。如果您的設備性能不足（近十幾年買的應該都不會出現這種情況），可以嘗試把一個資料夾裡的檔案拆分到多個資料夾中分批次查看，資料夾中的檔案數量越少載入越快。</p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-1.jpg" alt="GitHub Image" style="max-width: 48%; height: auto; display: inline-block; margin-right: 2%;"><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-2.jpg" alt="GitHub Image" style="max-width: 48%; height: auto; display: inline-block;"></p>
                                <p>——"☆"：這個是切換表圖片/裡圖片的按鈕。</p>
                                <p>在載入圖片後，您將看到所有的表圖片及其縮圖，這些附贈的圖片可以當作壁紙使用，與您贊助的內容無關。</p>
                                <p>隨後，可以在我們的Unifans中找到類似於"標籤：xxxxxx"樣式的說明，這就是標籤號，請把這個"xxxxxx"複製貼上到☆旁邊的輸入框中，隨後點擊☆，此時您便可以自由瀏覽贊助獲得的裡圖片了。</p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-3.jpg" alt="GitHub Image" style="max-width: 48%; height: auto; display: inline-block; margin-right: 2%;"><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-4.jpg" alt="GitHub Image" style="max-width: 48%; height: auto; display: inline-block;"></p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-5.jpg" alt="GitHub Image" style="max-width: 100%; height: auto;"></p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-6.jpg" alt="GitHub Image" style="max-width: 100%; height: auto;"></p>
                                <p>如果您確保了已經完全理解，可以點擊下方我們各自的Unifans連結繼續跳轉至我們的Unifans，或者根據標題是否感興趣閱讀一下其他條目。</p>
                            </div>
                        </div>
                    </div>

                    <div class="accordion">
                        <div class="accordion-header">
                            <div class="title-wrapper">
                                測試用圖片<span style="font-weight:bold; text-decoration:underline;">（請先用這組圖片確保軟體沒有問題再進行贊助）</span>
                            </div>
                            <span class="accordion-icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-inner">
                                <p>下方是一個20張圖片的.sfmg檔案，標籤碼為111，在贊助之前請先使用這組圖片測試軟體是否可用，以防止贊助後無法看到圖片。其中表圖片為女僕肖像畫、裡圖片為女僕壁紙。</p>
                                <p>測試用圖片下載地址：</p>
                                <p>-Catbox：<a href="https://files.catbox.moe/a2ncxc.rar">https://files.catbox.moe/a2ncxc.rar</a></p>
                                <p>-GoFile：<a href="https://gofile.io/d/ONe1DM">https://gofile.io/d/ONe1DM</a></p>
                                <p>-Mega：<a href="https://mega.nz/file/UTdlgKbA#nlnHCRb5SfXKqvfGZVvJ1zfI81yWs_0J3OJqtq_kriQ">https://mega.nz/file/UTdlgKbA#nlnHCRb5SfXKqvfGZVvJ1zfI81yWs_0J3OJqtq_kriQ</a></p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/2-1-1.jpg" alt="GitHub Image" style="max-width: 100%; height: auto;"></p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="accordion">
                        <div class="accordion-header">
                            關於我們決定執行此修改的原因
                            <span class="accordion-icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-inner">
                                <p>對於此改動造成的不便我們在此道歉，但這也是出於無奈之舉，因為近期我們發現頻繁的有人在沒有與我們進行任何溝通的情況下，開始私自將我們的指定的非公佈作品上傳到其它若干公開平台，並且我們後續與這些平台的溝通均極其麻煩，可以說如果動動手指就能上傳的一組圖，我們需要想辦法提交許多信息，經過許久的審批，才能得到一個不知是否成功的結果。雖然這股苗頭才剛起來，但為了防止後續雪球越滾越大，我們幾個比較熟悉的創作者還是經商討決定立即停更一段時間並做出對應措施。</p>
                                <p>事實上，我們並不反對您將我們的作品進行有限傳播的分享，比如和您身邊的朋友們私下傳閱、在群裡討論，這些我們都是完全理解並且很欣慰的。</p>
                                <p>但問題就在於，一旦作品被傳到開放的平台上去進行無限傳播，事情就完全不受你我的控制了。仔細想想，這種行為看似和在群裡公佈也差不了太多，可實際上更本質的層面下呢？</p>
                                <p>開放平台對於除了平台管理者外的所有人都是不受控的，只要上傳就會迅速被無數人下載、二次轉載、甚至被一些人打包成資源包進行無成本的二次販賣，而這和私下分享的本質區別就在這裡。私下分享，本質上還是在一個有人情、有邊界、擴散幅度有限的圈子裡，大家知道作品來自誰，也知道什麼能做、什麼不該做；而開放平台是去中心化的，且流量巨大，它不會替任何人考慮成本，只會按照"熱度、互動、可傳播性"去推動內容流動，平台的管理者並不會真正的好心區分誰是支持者、誰是路人、誰是上傳者，它只會根據數據表現去設置平台的死規則，分配曝光、引導流量，並在受到舉報時以避免麻煩為主，而這些流量最終產生的收益，既不會回到創作者身上，也與上傳者無關，更不會回饋給那些一直用實際行動支持我們的粉絲，而是去到了平台和二次傳播的其他人身上。</p>
                                <p>在這個過程中，真正為作品付出時間、金錢、精力的支持者們與我們，反而成了最容易被傷害的一方——問題並不在於"有人免費分享"本身，而是在於這種分享被平台機制所接管後，就不再是站在我們用戶一邊的行為了，它最終服務的不是觀眾，也不是創作者，而是平台的流量邏輯。上傳者可能是出於好意，我們能理解，但現實結果往往是，平台受益，二次傳播者牟利，上傳者沒有任何分成，創作者要為此付出高額的溝通成本和風險，真正支持我們的粉絲們則要承擔新內容縮水、停更、甚至最後消失的後果，就比如這次調整，可以說是我們斷更了近乎一個月的主要原因。</p>
                                <p>我們並不是想把所有責任簡單地推給某一方，而是想把這條鏈路講清楚，在平台的複雜機制與放大效應下，此舉最終會演變成對整個創作環境的長期傷害，而並非只是簡單的普通分享。</p>
                            </div>
                        </div>
                    </div>

                    <div class="accordion">
                        <div class="accordion-header">
                            關於附贈的壁紙（表圖片）與整合新帳號 <span class="accordion-icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-inner">
                                <p>對於每個表圖片我們都是按一般精細度的壁紙規格去做的，不過修圖可能不會那麼仔細，如果您感興趣的話也可以找到附贈的壓縮包下載壁紙原圖，我們把每張壁紙單獨放入了一個文件夾中，請按序號查收。此外，我們所有的表圖片內容，也預計將會部分同步集中發布在一個新的帳號中，不過這裡只是順帶提及一嘴，防止您看到了我們的新帳號因感到眼熟而感到困惑。</p>
                                <p>此外，出於謹慎起見，我們還計劃會對Unifans中的名稱與頭像進行修改，所以如果您未來點擊下方指定作者的Unifans後若發現頭像/名稱不對應，這是正常的，只要核對您想要解鎖帖子的名稱與日期（請以名稱為準，我們並不確定日期是否會與p站那邊偶爾出現一兩天的偏差），若能與p站那邊對應上，那麼便沒有問題。</p>
                                <p>最後，我們預計會在Unifans中也放上一個沒有☆功能的viewer文件以便某些用戶有著特殊的使用場景，因此如果您沒有特殊需求請不要下載那個軟件，防止無法查看到裡圖片。</p>
                            </div>
                        </div>
                    </div>

                    <div class="accordion">
                        <div class="accordion-header">
                            Viewer 軟體更新日誌 (最新更新：2025年12月26日 23:22-UTC+8)：<span class="accordion-icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-inner">
                                <p>v0.1 版本（最新版本）：</p> <p>Win</p> <p>1、修復了圖片在全螢幕模式下有質量損失的問題，現在瀏覽圖片和 png 圖片的質量完全相等</p> <p>2、修復了切換圖片卡頓的問題</p> <p>3、新增了鍵盤上下鍵切換圖片的功能</p> <p>4、修復了在輸入標籤號後，點擊其他位置無法退出輸入框，繼而無法左右鍵切換圖片的問題（但目前僅能點擊畫布區域退出輸入框）</p> <p>————————————————————————</p> <p>v0.2 版本（正在製作中，如果遇到問題可以回饋給我們，我們會列在這裡）：</p> <p>Win：</p> <p>1、正在嘗試優化導入檔案時的演算法，繼而減少導入檔案時的卡頓時間</p> <p>2、正在嘗試添加「輸入標籤號後縮略圖區域中的圖片也會改為該圖片」的優化</p> <p>Android：</p> <p>1、正在嘗試大幅減少導入檔案時的卡頓時間</p> <p>2、正在嘗試修復切換圖片時會卡頓 0.2s 左右的問題</p> <p>3、正在嘗試添加「輸入標籤號後縮略圖區域中的圖片也會改為該圖片」的優化</p>
                            </div>
                        </div>                        
                    </div>
                    
                `,
                ja: `
                    <p>こんにちは、これは複数のクリエイターによって共同で作成されたウェブサイトです。もしあなたが他のウェブサイトのリンクを通じてここに来られたのであれば、下の方で私たち各人のUnifansにアクセスすることができます。
しかし、初めてここを訪れる方は、私たちのUnifansにアクセスする前に、必ず以下の注意事項をよくお読みください。これは、サブスクリプション後に受け取るファイルの使い方を完全に理解するためです。
（展開するには項目をクリックしてください）</p>
                    <p></p>
                    <div class="accordion">
                        <div class="accordion-header">
                            <div class="title-wrapper">
                            スポンサーファイルの紹介<span style="font-weight:bold; text-decoration:underline;">（スポンサーになる前に必ず理解してください！！！）</span>
                            </div>
                            <span class="accordion-icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-inner">
                                <p>新規追加の操作をできるだけ簡略化しました。一言で概括すると——下記リンクのプログラムをダウンロードしてインストールし、スポンサー後に取得したファイルを選択し、'タグ番号'を入力するだけです。</p>
                                <p>（待機時間はデバイスの性能によって異なります。'タグ番号'は各作者のUnifansで確認できます。）</p>
                                <p></p>
                                <p>ただし、操作を確実に行うために、以下の3つの詳細説明をできるだけご覧ください。</p>
                                <p></p>
                                <p>（1）スポンサーファイル形式の説明：</p>
                                <p>スポンサーし、対応する圧縮パッケージを受け取り、解凍した後、多くの「.sfmg」形式ファイルを含むフォルダが得られます。各sfmgファイルは1枚の「表画像」（壁紙画像）と1枚の「裏画像」（スポンサーで実際に得られる画像）に対応しており、下記の30/50MBの画像ブラウザーソフトをダウンロードする必要があります。</p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/1-1.jpg" alt="GitHub Image" style="max-width: 100%; height: auto;"></p>
                                <p></p>
                                <p>（2）ソフトウェアインストール操作</p>
                                <p>まず、下記リンクの80MBの両端対応「Viewer」統合パッケージをダウンロードしてください。これは私たちが独自開発した小さな画像閲覧ソフトです。バグがあればどの作者にでもメッセージを残せば、更新を試みます。（現在対応しているのは：PC端末 - Win；モバイル端末 - アンドロイド(Android)です。アップルユーザーは今後の更新をお待ちください。）</p>
                                <p>Viewer画像ブラウザープログラムダウンロードアドレス：</p>
                                <p>-Catbox：<a href="https://files.catbox.moe/k4rp34.zip">https://files.catbox.moe/k4rp34.zip</a></p>
                                <p>-GoFile：<a href="https://gofile.io/d/rByC1X">https://gofile.io/d/rByC1X</a></p>
                                <p>-Mega：<a href="https://mega.nz/file/wKd3gLbJ#D_mj2bCvk_WH_077zF58DsGOpZWGvdhIa-el-mzsZh0">https://mega.nz/file/wKd3gLbJ#D_mj2bCvk_WH_077zF58DsGOpZWGvdhIa-el-mzsZh0</a></p>
                                <p>ダウンロード後、PCユーザーは追加操作なしで直接開くことができます。モバイルユーザーはインストールが必要です。このソフトウェアの後続操作でフォルダを選択する必要があるため、インストール時の2つのプロンプト「機微な権限を申請します」「動画/画像ファイルの読み取り権限」に同意してください。これには他の目的はなく、このソフトウェアはスタンドアロンで非接続型であり、情報を漏洩することもありません。</p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/1-2.jpg" alt="GitHub Image" style="max-width: 100%; height: auto;"></p>
                                <p></p>
                                <p>（3）ソフトの機能について</p>
                                <p>インストール完了後、開くと「中/English」の言語オプションが表示されます（PCでは右下、モバイルでは右上）。まず対応する言語に切り替えることができます。次に、他のオプションの機能を順に説明します：</p>
                                <p>——「フォルダを選択」：クリック後、スポンサーした解凍後の.sfmgファイルが多く含まれるフォルダを選択して読み込んでください。ファイルの読み込みプロセスはデバイスの性能によって時間が異なる場合があり、この間は動作が重くなる可能性があります。終了しないでください。デバイスの性能が不足している場合（過去十数年以内に購入したデバイスでは通常このようなことは起こらないはずです）、1つのフォルダ内のファイルを複数のフォルダに分割してバッチで閲覧することを試みてください。フォルダ内のファイル数が少ないほど読み込みが速くなります。</p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-1.jpg" alt="GitHub Image" style="max-width: 48%; height: auto; display: inline-block; margin-right: 2%;"><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-2.jpg" alt="GitHub Image" style="max-width: 48%; height: auto; display: inline-block;"></p>
                                <p>——「☆」：これは表画像と裏画像を切り替えるボタンです。</p>
                                <p>画像を読み込んだ後、すべての表画像とそのサムネイルが表示されます。これらの付属画像は壁紙として使用でき、スポンサーしたコンテンツとは関係ありません。</p>
                                <p>その後、私たちのUnifansで「タグ：xxxxxx」のようなスタイルの説明を見つけることができます。これがタグ番号です。この「xxxxxx」を☆の横の入力ボックスにコピー＆ペーストし、その後☆をクリックしてください。これで、スポンサーで得た裏画像を自由に閲覧できるようになります。</p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-3.jpg" alt="GitHub Image" style="max-width: 48%; height: auto; display: inline-block; margin-right: 2%;"><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-4.jpg" alt="GitHub Image" style="max-width: 48%; height: auto; display: inline-block;"></p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-5.jpg" alt="GitHub Image" style="max-width: 100%; height: auto;"></p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/3-6.jpg" alt="GitHub Image" style="max-width: 100%; height: auto;"></p>
                                <p>完全に理解したことを確認できたら、下記の私たち各自のUnifansリンクをクリックしてUnifansにジャンプするか、タイトルに興味があるかどうかに基づいて他の項目を読んでみてください。</p>
                            </div>
                        </div>
                    </div>

                    <div class="accordion">
                        <div class="accordion-header">
                            <div class="title-wrapper">
                                テスト用画像<span style="font-weight:bold; text-decoration:underline;">（スポンサーする前にこの画像セットでソフトウェアに問題がないことを確認してください）</span>
                            </div>
                            <span class="accordion-icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-inner">
                                <p>下記は20枚の画像を含む.sfmgファイルで、タグコードは111です。スポンサーする前に、まずこの画像セットを使用してソフトウェアが利用可能かどうかをテストし、スポンサー後に画像が見られなくなることを防いでください。その中で表画像はメイドの肖像画、裏画像はメイドの壁紙です。</p>
                                <p>テスト用画像ダウンロードアドレス：</p>
                                <p>-Catbox：<a href="https://files.catbox.moe/a2ncxc.rar">https://files.catbox.moe/a2ncxc.rar</a></p>
                                <p>-GoFile：<a href="https://gofile.io/d/ONe1DM">https://gofile.io/d/ONe1DM</a></p>
                                <p>-Mega：<a href="https://mega.nz/file/UTdlgKbA#nlnHCRb5SfXKqvfGZVvJ1zfI81yWs_0J3OJqtq_kriQ">https://mega.nz/file/UTdlgKbA#nlnHCRb5SfXKqvfGZVvJ1zfI81yWs_0J3OJqtq_kriQ</a></p>
                                <p><img src="https://raw.githubusercontent.com/Celistra/mystore/main/2-1-1.jpg" alt="GitHub Image" style="max-width: 100%; height: auto;"></p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="accordion">
                        <div class="accordion-header">
                            この変更を実施する決定の理由について
                            <span class="accordion-icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-inner">
                                <p>この変更によってご不便をおかけしまして、ここにお詫び申し上げます。しかし、これはやむを得ない措置でもあります。なぜなら、最近、私たちは私たちとの事前のコミュニケーションなしに、私たちが指定した非公開の作品が他の複数の公開プラットフォームにアップロードされ始めたことに気づきました。そして、これらのプラットフォームとのその後のコミュニケーションは非常に面倒でした。指先一つでアップロードできる一連の画像に対して、私たちは多くの情報を提出し、長い承認プロセスを経て、成功したかどうかわからない結果を得る必要がありました。この傾向はまだ始まったばかりですが、後で雪だるま式に大きくなるのを防ぐために、私たちの数人の親しいクリエイターは話し合いの末、しばらくの間更新を停止し、対応策を講じることに決めました。</p>
                                <p>実際、私たちはあなたが私たちの作品を限られた範囲で共有することに反対しません。例えば、身近な友人たちとプライベートに共有したり、グループ内で話し合ったりすることは、私たちは完全に理解し、非常に嬉しく思っています。</p>
                                <p>しかし問題は、作品が開放的なプラットフォームにアップロードされ、無制限に広まると、事態は完全にあなたと私たちの制御外になってしまうことです。よく考えてみてください。この行為はグループ内で公開することとそれほど変わらないように見えますが、実際にはより本質的なレベルではどうでしょうか？</p>
                                <p>開放的なプラットフォームは、プラットフォーム管理者以外のすべての人にとって制御不能です。アップロードされると、すぐに無数の人々にダウンロードされ、再投稿され、一部の人々によって無料で二次販売されるリソースパックにパッケージ化されることさえあります。これがプライベート共有との本質的な違いです。プライベート共有は、本質的には人間的な触れ合い、境界、拡散範囲が限られたサークル内でのものです。誰もが作品の出所を知り、何ができて何ができないかを知っています。一方、開放的なプラットフォームは分散型で、巨大なトラフィックを持っています。プラットフォームは誰かのためにコストを考慮することはなく、「熱度、インタラクション、伝播性」に基づいてコンテンツの流れを促進するだけです。プラットフォーム管理者は、支持者、通行人、アップローダーを本当に親切に区別することはありません。データのパフォーマンスに基づいてプラットフォームの厳格なルールを設定し、露出を割り当て、トラフィックを誘導し、報告された場合には主にトラブルを避けます。このトラフィックによって最終的に生成される利益は、クリエイターに戻ることもなく、アップローダーとは関係なく、実際の行動で私たちを支持し続けてきたファンにも還元されません。代わりに、プラットフォームと二次的に広める他の人々のものになります。</p>
                                <p>この過程で、作品に本当に時間、お金、エネルギーを費やした支持者たちと私たちは、かえって最も傷つきやすい当事者になってしまいました。問題は「誰かが無料で共有すること」そのものではなく、この共有がプラットフォームのメカニズムによって管理された後、それが私たちのユーザーの側に立つ行動ではなくなったことです。それは最終的に視聴者にも、クリエイターにも奉仕するのではなく、プラットフォームのトラフィックロジックに奉仕します。アップローダーは善意から行動しているかもしれません。私たちは理解できます。しかし現実の結果は、プラットフォームが利益を得、二次的な伝播者が儲かり、アップローダーは何の分配も受けず、クリエイターは高額のコミュニケーションコストとリスクを負わなければならず、私たちを本当に支持しているファンは、新しいコンテンツの縮小、更新停止、最終的には消滅の結果を負わなければならないことが多いでしょう。例えば、この調整は、私たちがほぼ一ヶ月間更新を停止した主な理由と言えます。</p>
                                <p>私たちはすべての責任を単純にある一方に押し付けたいわけではありません。むしろ、この繋がりを明確にしたいのです。プラットフォームの複雑なメカニズムと拡大効果の下で、この行為は最終的には単なる普通の共有ではなく、創作環境全体に長期的な被害をもたらすことになるでしょう。</p>
                            </div>
                        </div>
                    </div>

                    <div class="accordion">
                        <div class="accordion-header">
                            付属の壁紙（表画像）と統合新アカウントについて <span class="accordion-icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-inner">
                                <p>各表画像は一般的な精細度の壁紙仕様で作成していますが、レタッチはそれほど丁寧ではない可能性があります。興味がある方は、付属の圧縮パッケージから壁紙の原画像をダウンロードすることもできます。各壁紙を個別のフォルダに入れていますので、シーケンス番号で確認してください。また、私たちのすべての表画像コンテンツは、一部を新しいアカウントに同期して集中投稿する予定です。ここでは簡単に触れるだけですが、新しいアカウントを見て馴染みがあると感じて混乱することを防ぐためです。</p>
                                <p>さらに、慎重を期して、Unifans内の名前とアバターを変更する予定です。そのため、将来下の指定された作者のUnifansをクリックした後、アバター/名前が一致しない場合でもそれは正常です。解除したい投稿の名前と日付を（名前を優先してください。日付がPixiv側と1〜2日ずれる可能性があるため確実ではありません）Pixiv側と照合できれば問題ありません。</p>
                                <p>最後に、Unifansにも☆機能のないviewerファイルをアップロードする予定です。一部のユーザーが特殊な使用シーンを持っているためです。そのため、特別なニーズがない場合はそのソフトウェアをダウンロードしないでください。裏画像が見られなくなるのを防ぐためです。</p>
                            </div>
                        </div>
                    </div>

                    <div class="accordion">
                        <div class="accordion-header">
                            Viewer ソフトウェア更新履歴 (最新更新：2025年12月26日 23:22-UTC+8)：<span class="accordion-icon">▼</span>
                        </div>
                        <div class="accordion-content">
                            <div class="accordion-inner">
                                <p>v0.1 バージョン（最新バージョン）：</p>
                                <p>Win</p>
                                <p>1、全画面モードでの画質低下問題を修正しました。閲覧画質が元の png ファイルと同等になりました。</p>
                                <p>2、画像切り替え時のカクつき（ラグ）を修正しました。</p>
                                <p>3、キーボードの上下キーで画像を切り替える機能を追加しました。</p>
                                <p>4、タグ番号入力後、他の場所をクリックしても入力ボックスから抜けられず、左右キーで画像切り替えができなくなる問題を修正しました（※現在はキャンバスエリアをクリックすることで解除可能です）。</p>
                                <p>————————————————————————</p>
                                <p>v0.2 バージョン（開発中。問題が発生した場合はフィードバックをお願いします。こちらに追記いたします）：</p>
                                <p>Win：</p>
                                <p>1、ファイル読み込み時のアルゴリズムを最適化し、インポート時の待ち時間を短縮するよう調整しています。</p>
                                <p>2、「タグ番号入力後にサムネイルエリアの画像も該当する画像に変更される」最適化の追加を試みています。</p>
                                <p>Android：</p> 
                                <p>1、ファイル読み込み時のカクつきを大幅に軽減するよう調整しています。</p>
                                <p>2、画像切り替え時に約 0.2 秒発生するラグの修正を試みています。</p>
                                <p>3、「タグ番号入力後にサムネイルエリアの画像も該当する画像に変更される」最適化の追加を試みています。</p>
                            </div>
                        </div>                        
                    </div>
                    
                `
            }
        };

        // 返回按钮功能
        document.getElementById('backButton').addEventListener('click', function() {
            const profileContainer = document.getElementById('profileContainer');
            profileContainer.classList.remove('show');
            profileContainer.style.display = 'none';
            document.getElementById('languageSelector').style.display = 'flex';
        });

        // 更新返回按钮文本
        function updateBackButtonText(language) {
            const backButton = document.getElementById('backButton');
            const text = backButton.getAttribute(`data-lang-${language}`) || '返回';
            backButton.textContent = text;
        }

        // 初始化手风琴功能
        function initAccordions() {
            const accordions = document.querySelectorAll('.accordion');
            accordions.forEach(accordion => {
                const header = accordion.querySelector('.accordion-header');
                header.addEventListener('click', () => {
                    accordion.classList.toggle('active');
                });
            });
        }

        // 初始化粒子效果
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 1200 } },
                color: { value: "#c084fc" },
                shape: {
                    type: "circle",
                    stroke: { width: 0, color: "#000000" },
                    polygon: { nb_sides: 5 }
                },
                opacity: {
                    value: 0.4,
                    random: true,
                    anim: { enable: true, speed: 2, opacity_min: 0.1, sync: false }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 3, size_min: 0.2, sync: false }
                },
                line_linked: {
                    enable: false
                },
                move: {
                    enable: true,
                    speed: 0.8,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: { enable: false, rotateX: 600, rotateY: 1200 }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "push" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    push: { particles_nb: 5 }
                }
            },
            retina_detect: true
        });

        // 语言选择功能
        document.querySelectorAll('.language-option').forEach(option => {
            option.addEventListener('click', () => {
                const language = option.getAttribute('data-language');
                showProfile(language);
            });
        });


        // 显示个人资料页面（优化版：恢复所有手风琴 + 修改文案）
        function showProfile(language) {
            document.getElementById('languageSelector').style.display = 'none';
            
            const profileContainer = document.getElementById('profileContainer');
            profileContainer.style.display = 'flex';
            void profileContainer.offsetWidth;
            profileContainer.classList.add('show');
            
            // 上方：输入框区域
            document.getElementById('profileContent').innerHTML = `
                <div class="text-center py-6 max-w-2xl mx-auto">
                    <!-- 标题：白色 + 悬停轻微放大 + 光晕增强 -->
                    <h2 class="text-3xl font-bold mb-10 inline-block text-white" 
                        style="text-shadow: 0 0 8px rgba(192, 132, 252, 0.8); 
                               transition: all 0.4s ease;"
                        onmouseover="this.style.transform='scale(1.08)'; this.style.textShadow='0 0 18px rgba(192, 132, 252, 1)'"
                        onmouseout="this.style.transform='scale(1)'; this.style.textShadow='0 0 8px rgba(192, 132, 252, 0.8)'">
                        请输入链接
                    </h2>
                    
                    <div class="max-w-lg mx-auto">
                        <!-- 输入框：悬停阴影增强 -->
                        <input 
                            type="text" 
                            id="redeemCode" 
                            placeholder="" 
                            class="w-full px-6 py-4 text-lg text-gray-800 rounded-xl focus:outline-none focus:ring-4 focus:ring-var(--primary-color) mb-6 shadow-lg transition-all duration-300"
                            autocomplete="off"
                            onmouseover="this.style.boxShadow='0 0 20px rgba(192, 132, 252, 0.6)'"
                            onmouseout="this.style.boxShadow='0 4px 15px rgba(0,0,0,0.2)'"
                        >
                        <br>
                        <!-- 按钮：抑制放大到 1.05 倍 + 阴影增强 -->
                        <button 
                            onclick="submitRedeem()" 
                            class="w-full px-8 py-4 bg-gradient-to-r from-var(--primary-color) to-var(--secondary-color) text-white text-xl font-bold rounded-xl shadow-lg transition-all duration-500"
                            style="text-shadow: 0 0 10px rgba(192, 132, 252, 0.9);"
                            onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 0 25px rgba(192, 132, 252, 0.6)'"
                            onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 8px 25px rgba(192, 132, 252, 0.3)'"
                        >
                            移码
                        </button>
                    </div>
                    
                    <div id="redeemResult" class="mt-10 text-xl min-h-24 px-4">
                        <style>
                            #redeemResult p {
                                transition: all 0.3s ease !important;
                            }
                            #redeemResult p:hover {
                                transform: none !important;
                                text-shadow: 0 0 15px rgba(192, 132, 252, 1) !important;
                            }
                        </style>
                    </div>
                </div>

                <!-- 恢复所有原版手风琴内容 -->
                ${profileConfig.bio[language]}
            `;     
            // 更新返回按钮文本
            updateBackButtonText(language);
            
            // 初始化手风琴功能（关键！让所有折叠框能点开）
            initAccordions();
        }

        async function submitRedeem() {
            const codeInput = document.getElementById('redeemCode');
            const resultDiv = document.getElementById('redeemResult');
            const code = codeInput.value.trim();
            
            if (!code) {
                resultDiv.innerHTML = `<span style="color:#ffb6c1;">请输入</span>`;
                return;
            }

            resultDiv.innerHTML = `<span style="color:#a78bfa;">请稍候...</span>`;

            try {
                const res = await fetch('/api/redeem', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({code: code.toUpperCase()})
                });

                const data = await res.json();

                if (data.success) {
                    resultDiv.innerHTML = `
                        <div class="bg-green-900 bg-opacity-50 border-2 border-green-400 rounded-xl p-6">
                            <p class="text-2xl font-bold text-green-300 mb-4">输出：（true</p>
                            <p class="text-lg leading-relaxed">${data.message.replace(/\\n/g, '<br>')}</p>
                        </div>
                    `;
                } else {
                    const fake = 'FAKE' + Math.random().toString(36).substring(2, 8).toUpperCase();
                    resultDiv.innerHTML = `
                        <div class="bg-red-900 bg-opacity-50 border-2 border-red-400 rounded-xl p-6">
                            <p class="text-2xl font-bold text-red-300 mb-4">输出：（wrong</p>
                            <p class="text-lg">${fake}</p>
                        </div>
                    `;
                }
            } catch (e) {
                resultDiv.innerHTML = `<span style="color:#ff6b6b;">网络错误，请刷新重试，若持续出现该错误请通知作者</span>`;
            }
        }

        // 将文本中的URL转换为可点击链接
        function convertUrlsToLinks() {
            const content = document.getElementById('profileContent');
            const text = content.innerHTML;
            
            // 简单的URL检测正则表达式
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            
            // 不需要再次转换，因为我们已经在bio中设置了链接
            // 这段代码保留以备将来使用，如果你想动态添加文本而不是在配置中设置
        }
    </script>
</body>
</html>
