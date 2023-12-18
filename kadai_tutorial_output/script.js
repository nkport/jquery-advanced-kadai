$(function () {

    // 「もっとみる」ボタンのホバー処理
    $('.button-more').on('mouseover', function () {
        $(this).animate({
            opacity: 0.5,
            marginLeft: 20,
        }, 100);
    });
    $('.button-more').on('mouseout', function () {
        $(this).animate({
            opacity: 1.0,
            marginLeft: 0,
        }, 100);
    });

    // mvのカルーセル
    $('.carousel').slick({
        autoplay: true,
        dots: true,
        infinite: true,
        autoplaySpeed: 5000,
        arrows: false,
    });

    // フォームに未入力があるとエラー
    $('#submit').on('click', function (event) {
        event.preventDefault();

        let result = inputCheck();
        let error = result.error;
        let message = result.message;

        // もしエラーじゃなかったら送信できる
        if (error == false) {
            // Ajaxで送信するコード
            $.ajax({
                url: 'https://api.staticforms.xyz/submit',
                type: 'POST',
                dataType: 'json',
                data: $('#form').serialize(),
                success: function (result) {
                    alert('お問い合わせを送信しました。')
                },
                error: function (xhr, resp, text) {
                    alert('お問い合わせを送信できませんでした。')
                }
            })
        }
        // 上記以外の時はエラーメッセージを出す
        else {
            alert(message);
        }
    });

    // 入力してない項目の背景色が赤くなる
    $('#name').blur(function () {
        inputCheck();
    });
    $('#kana').blur(function () {
        inputCheck();
    });
    $('#email').blur(function () {
        inputCheck();
    });
    $('#tel').blur(function () {
        inputCheck();
    });
    $('#message').blur(function () {
        inputCheck();
    });
    $('#agree').click(function () {
        inputCheck();
    });

    //お問い合わせフォームの入力チェック
    function inputCheck() {

        let result;
        let message = '';
        let error = false;

        // 名前入力のチェック
        if ($('#name').val() == '') {
            $('#name').css('background-color', '#f79999');
            error = true;
            message += 'お名前を入力してください。\n';
        } else {
            $('#name').css('background-color', '#fafafa');
        }

        // フリガナのチェック
        if ($('#kana').val() == '') {
            $('#kana').css('background-color', '#f79999');
            error = true;
            message += 'フリガナを入力してください。\n';
        } else {
            $('#kana').css('background-color', '#fafafa');
        }

        // 問い合わせ内容のチェック
        if ($('#message').val() == '') {
            $('#message').css('background-color', '#f79999');
            error = true;
            message += 'お問い合わせ内容を入力してください。\n';
        } else {
            $('#message').css('background-color', '#fafafa');
        }

        // メールアドレスの入力チェック
        if ($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1) {
            $('#email').css('background-color', '#f79999');
            error = true;
            message += 'メールアドレスが未記入、または「@」「.」が含まれていません。\n';
        } else {
            $('#email').css('background-color', '#fafafa');
        }

        // 電話番号の入力チェック
        if ($('#tel').val() != '' && $('#tel').val().indexOf('-') == -1) {
            $('#tel').css('background-color', '#f79999');
            error = true;
            message += '電話番号に「-」が含まれていません。\n';
        } else {
            $('#tel').css('background-color', '#fafafa');
        }

        // 個人情報チェックボックスの入力チェック
        if ($('#agree').prop('checked') == false) {
            error = true;
            message += '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n';
        }

        // 入力し終えたら送信できるボタン画像に切り替わる
        if (error == true) {
            $('#submit').attr('src', 'images/button-submit.png');
        } else {
            $('#submit').attr('src', 'images/button-submit-blue.png')
        }

        result = {
            error: error,
            message: message
        }

        return result;

    }

});