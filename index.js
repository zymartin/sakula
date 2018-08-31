var originData =
{
    key1: { name: '肯德基', power: 1 },
    key2: { name: '老王牛肉面', power: 1 },
    key3: { name: '老上海馄饨', power: 1 },
    key4: { name: '永旺', power: 1 },
    key5: { name: '兰州拉面', power: 1 },
    key6: { name: '萨莉亚', power: 1 },
    key7: { name: '大快活', power: 1 }
};

Array.prototype.shuffle = function () {
    var array = this;
    var m = array.length,
        t, i;
    while ( m ) {
        i = Math.floor( Math.random() * m-- );
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
function parents( elem, selector ) {
    var elements = [];
    var ishaveselector = selector !== undefined;

    while ( ( elem = elem.parentElement ) !== null ) {
        if ( elem.nodeType !== Node.ELEMENT_NODE ) {
            continue;
        }
        if ( !ishaveselector || elem.matches( selector ) ) {
            elements.push( elem );
        }
    }

    return elements;
};

var root = document.getElementById( 'root' ),
    container = document.getElementById( 'container' ),
    reset = document.getElementById( 'reset' ),
    run = document.getElementById( 'run' ),

    foodArr = createFoodArr();

function createFoodArr() {
    var result = [];

    for ( var key in originData ) {
        var item = originData[key];
        for ( var m = 0; m < item.power; m++ ) {
            result.push( item.name );
        }
    }

    return result;
}

function sakulaInit() {
    var chaosArr = foodArr.shuffle();
    var htmlstr = '';
    for ( var i = 0; i < chaosArr.length; i++ ) {
        htmlstr += `<div class="card">
                <div class="card-wrap">
                    <div class="card-front piece">
                        <img src='./sakula-card.jpeg' alt='' />
                    </div>
                    <div class="card-back piece">
                        ${chaosArr[i]}
                    </div>
                </div>
            </div>`
    }
    container.innerHTML = htmlstr;
}

function hitCard( index ) {
    var cardTarget = document.getElementsByClassName( 'card' )[index];
    if ( cardTarget.classList.contains( 'back' ) ) {
        hitCard( Math.floor( Math.random() * foodArr.length ) );
    } else {
        cardTarget.classList.add( 'back' );
    }
}



sakulaInit();

container.addEventListener( 'click', function ( e ) {
    parents( e.target, '.card' )[0].classList.toggle( 'back' );
}, false );

reset.addEventListener( 'click', function ( e ) {
    sakulaInit();
} );
run.addEventListener( 'click', function ( e ) {
    var choiceIndex = Math.floor( Math.random() * foodArr.length );
    hitCard( choiceIndex );
} )
