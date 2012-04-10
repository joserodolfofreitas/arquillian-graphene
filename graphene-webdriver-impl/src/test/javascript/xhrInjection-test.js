module("XHR Injection");

(function() {

    var inj = Graphene.xhrInjection;
    var originalXhr = window.XMLHttpRequest;

    QUnit.testStart = function() {
        window.XMLHttpRequest = originalXhr;
        inj.reset();
    };

    function replaceXHRPrototype(methods) {
        var instances = [];
        var Replacement = function() {
            instances.push(this);
        };
        Replacement.prototype = methods;
        window.XMLHttpRequest = Replacement;
        return instances;
    }
    
    // TESTS
    
    test("accessor object not null", function() {
        ok(inj);
    });

    test("test injection", function() {
        // given
        ok(inj.inject);
        var backup = window.XMLHttpRequest;

        // when
        inj.inject();

        // then
        notStrictEqual(window.XMLHttpRequest, backup);
        notEqual(window.XMLHttpRequest, null);
        ok(window.XMLHttpRequest.prototype.abort);
    });

    test("test xhr wrapper delegation (for abort)", function() {
        // given
        var aborted = false;
        replaceXHRPrototype({
            abort : function() {
                aborted = true;
            }
        });

        // when
        inj.inject();
        var xhr = new window.XMLHttpRequest();
        xhr.abort();

        // then
        ok(aborted);
    });

    test("test xhr interception (for abort)", function() {
        // given
        var abortInvoked = false;
        var interceptor1Started = false;
        var interceptor2Started = false;
        var interceptor1Finished = false;
        var interceptor2Finished = false;

        replaceXHRPrototype({
            abort : function() {
                abortInvoked = true;
                return "returnValue";
            }
        });

        // interceptor 1
        inj.onAbort(function(ctx, args) {
            interceptor1Started = true;

            ok(!abortInvoked);
            ok(!interceptor2Started);
            ok(!interceptor2Finished);

            var result = ctx.proceed(args);

            ok(abortInvoked);
            ok(interceptor2Started);
            ok(interceptor2Finished);

            interceptor1Finished = true;
            return result;
        });
        // interceptor 2
        inj.onAbort(function(ctx, args) {
            interceptor2Started = true;

            ok(!abortInvoked);
            ok(interceptor1Started);
            ok(!interceptor1Finished);

            var result = ctx.proceed(args);

            ok(abortInvoked);
            ok(interceptor1Started);
            ok(!interceptor1Finished);

            interceptor2Finished = true;

            return result;
        });

        // when
        inj.inject();
        var xhr = new window.XMLHttpRequest();
        xhr.abort();

        // then
        ok(abortInvoked);
        ok(interceptor1Finished);
        ok(interceptor2Finished);
    });

    test("test xhr wrapper delegation (for onreadystatechange)", function() {
        // given
        var statechanged = false;
        var instances = replaceXHRPrototype();

        // when
        inj.inject();
        var xhr = new window.XMLHttpRequest();
        xhr.onreadystatechange = function() {
            statechanged = true;
        }
        ok(instances[0]);
        instances[0].onreadystatechange();

        // then
        ok(statechanged);
    });

    test("test xhr interception (for onreadystatechange)", function() {
        // given
        var statechanged = false;
        var interceptor1Started = false;
        var interceptor2Started = false;
        var interceptor1Finished = false;
        var interceptor2Finished = false;

        var instances = replaceXHRPrototype();

        // interceptor 1
        inj.onreadystatechange(function(ctx, args) {
            interceptor1Started = true;

            ok(!statechanged);
            ok(!interceptor2Started);
            ok(!interceptor2Finished);

            var result = ctx.proceed(args);

            ok(statechanged);
            ok(interceptor2Started);
            ok(interceptor2Finished);

            interceptor1Finished = true;
            return result;
        });
        // interceptor 2
        inj.onreadystatechange(function(ctx, args) {
            interceptor2Started = true;

            ok(!statechanged);
            ok(interceptor1Started);
            ok(!interceptor1Finished);

            var result = ctx.proceed(args);

            ok(statechanged);
            ok(interceptor1Started);
            ok(!interceptor1Finished);

            interceptor2Finished = true;

            return result;
        });

        // when
        inj.inject();
        var xhr = new window.XMLHttpRequest();
        xhr.onreadystatechange = function() {
            statechanged = true;
        }
        ok(instances[0]);
        instances[0].onreadystatechange();

        // then
        ok(statechanged);
        ok(interceptor1Finished);
        ok(interceptor2Finished);
    });

    test("test readystatechange", function() {
        // given
        var readyState = 0;
        var instances = replaceXHRPrototype();

        // when
        inj.inject();
        var xhr = new window.XMLHttpRequest();

        var instance = instances[0];
        ok(instance);

        xhr.onreadystatechange = function(request) {
            ok(request.readyState == readyState);
            if (readyState < 4) {
                ok(request.responseText == undefined);
                ok(request.responseXML == undefined);
                ok(request.status == undefined);
                ok(request.statusText == undefined);
            } else {
                equal(request.responseText, "responseText")
                equal(request.responseXML, "responseXML")
                equal(request.status, 200)
                equal(request.statusText, "statusText")
            }
            readyState += 1;
        }

        instance.readyState = 0;
        instance.onreadystatechange();

        instance.readyState = 1;
        instance.onreadystatechange();

        instance.readyState = 2;
        instance.onreadystatechange();

        instance.readyState = 3;
        instance.onreadystatechange();

        instance.readyState = 4;
        instance.responseText = "responseText";
        instance.responseXML = "responseXML";
        instance.status = 200;
        instance.statusText = "statusText";
        instance.onreadystatechange();

        // then
        equal(readyState, 5);
    })
})();