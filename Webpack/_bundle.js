(()=>{var e={176:(e,t,s)=>{const{Chess:o}=s(938),r=s(627),i=s(78);class n{constructor(e,t){this.id=e,this.WorB=t,this.requiresVerbose=!0,this.requiresLastPlayerMove=!1}selectMove(e,t){return null}}var a={random:class extends n{constructor(e,t){super(e,t),this.requiresVerbose=!1}selectMove(e,t){return null}},alwaysTake:class extends n{constructor(e,t){super(e,t),this.requiresVerbose=!0}selectMove(e,t){for(let r=0;r<t.length;r++){const i=t[r];if((s=new o(e.fen())).move(i),s.isCheckmate())return i}for(let s=0;s<t.length;s++){const o=t[s];if(0!=e.get(o.to))return o}for(let r=0;r<t.length;r++){const i=t[r];var s;if((s=new o(e.fen())).move(i),s.isCheck())return i}return t[Math.floor(Math.random()*t.length)]}},greedy:class extends n{constructor(e,t){super(e,t),this.requiresVerbose=!0,this.boardsGenerated=0}selectMove(e,t){var s="b";this.WorB&&(s="w");var i=null,n=-1;for(let h=0;h<t.length;h++){var a=new o(e.fen());this.boardsGenerated+=1;const l=t[h];a.move(l);const c=r.pieceValue(a,s);c>n&&(i=l,n=c)}return i}},MCTS:class extends n{constructor(e,t){super(e,t),this.requiresVerbose=!0,this.rootNode=null,this.rootID=-1,this.allExpandedNodes=[],this.requiresLastPlayerMove=!0,this.playerAvailableMoves=null,this.playerBoardState=null,this.MAX_PATH_LENGTH=1e3,this.turn=t?1:2}setRootNode(e){}nodeVisited(e){for(let t=0;t<this.allExpandedNodes.length;t++)if(e===this.allExpandedNodes[t])return!0;return!1}improveTree(){for(var e=[this.rootNode],t=this.rootNode,s=!0;t.fullyExplored();){if(t.hasNoMoves()||e.length>this.MAX_PATH_LENGTH){s=!1;break}t=t.getNext(),e.push(t),this.nodeVisited(t.id)||this.allExpandedNodes.push(t.id)}s&&t.expand()}selectMove(e,t){this.allExpandedNodes=[];var s=!1;if(null!=this.playerAvailableMoves)for(let t=0;t<this.playerAvailableMoves.length;t++){var r=this.playerAvailableMoves[t],n=new o(this.playerBoardState.board.fen());n.move(r.move),n.fen()===e.fen()&&null!=this.playerBoardState&&(this.rootNode=this.playerBoardState.childrenDict[r.id],s=!0)}null!==this.rootNode&&s||(console.log("Couldnt retrieve"),this.rootNode=i.getNewNode(e,null,e.moves({verbose:!0}),this.WorB,null)),this.turn++;const a=Date.now();for(;Date.now()-a<1e3;)this.improveTree();var h=null,l=-1,c=null,u=Object.keys(this.rootNode.moveObjects).length;console.log(this.rootNode.id+" < root ID");for(let e=0;e<u;e++){var d=this.rootNode.moveObjects[e],f=this.rootNode.childrenDict[d.id];f.qValue>l&&(h=d.move,l=f.qValue,c=f)}this.playerAvailableMoves=[];for(let e=0;e<c.moveObjects.length;e++)this.playerAvailableMoves.push(c.moveObjects[e]);return this.playerBoardState=c,h}}};t.getAgent=function(e,t,s){const o=Object.keys(a);for(var r=0;r<o.length;r++)if(o[r]===e)return new a[e](t,s);return null}},627:(e,t)=>{const s=["a","b","c","d","e","f","g","h"],o={p:1,n:3.05,b:3.33,r:5.63,q:9.5,k:0};function r(e){var t=0;for(let s=0;s<e;s++)denominator=Math.random(),t+=denominator-.5;1/t>1e5&&console.log("A miracle: "+1/t)}t.evaluateBoard=function(e){return count},t.pieceValue=function(e,t){var i=0,n=0,a=[];for(let h=0;h<s.length;h++)for(let l=1;l<s.length+1;l++)r(1e3),tile=s[h]+l,a.push(tile),piece=e.get(tile),0!=piece&&(piece.color===t?i+=o[piece.type]:n+=o[piece.type]);return(i+Number.EPSILON)/(i+n+Number.EPSILON)}},73:(e,t,s)=>{var o=new(s(938).Chess);t.runGame=function(e,t,s){o.reset();for(var r=0;;){if(s&&console.log(o.fen()),o.isGameOver())return o.isCheck()?t:null;var i;i=e.requiresVerbose?o.moves({verbose:!0}):o.moves();const a=e.selectMove(o,i);if(o.move(a),r++,s&&console.log(o.fen()),o.isGameOver())return o.isCheck()?e:null;var n;n=t.requiresVerbose?o.moves({verbose:!0}):o.moves();const h=t.selectMove(o,n);o.move(h),r++}console.log("game length: "+r);const a=o.moves();console.log(e.selectMove("boardPlaceholder",a))}},78:(e,t,s)=>{const{Chess:o}=s(938),r=s(627);var i=-1;class n{constructor(e){this.move=e,this.id=i+=1}}class a{constructor(e,t,s,o,n){this.id=i+=1,this.board=e,this.parent=t,this.moves=s,this.moveObjects=[],this.childrenDict=new Object,this.WorB=o,this.action=n;var a="b";o&&(a="w"),this.qValue=r.pieceValue(this.board,a)}fullyExplored(){return Object.keys(this.childrenDict).length===this.moves.length}hasNoMoves(){return 0===this.moves.length}getNext(){if(Object.keys(this.childrenDict).length!=this.moves.length)return console.log("MISTAKE! node requesting next without being expanded first"),null;var e=this.moveObjects[Math.floor(Math.random()*this.moveObjects.length)];return this.childrenDict[e.id]}expand(){for(let h=0;h<this.moves.length;h++){var e=this.moves[h],t=new n(e);this.moveObjects.push(t);var s=new o(this.board.fen());s.move(e);var r=s.moves({verbose:!0}),i=new a(s,this,r,!this.WorB,e);this.childrenDict[t.id]=i}}}t.getNewNode=function(e,t,s,o,r){return new a(e,t,s,o,r)}},938:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Chess=t.validateFen=t.SQUARES=t.DEFAULT_POSITION=t.KING=t.QUEEN=t.ROOK=t.BISHOP=t.KNIGHT=t.PAWN=t.BLACK=t.WHITE=void 0,t.WHITE="w",t.BLACK="b",t.PAWN="p",t.KNIGHT="n",t.BISHOP="b",t.ROOK="r",t.QUEEN="q",t.KING="k",t.DEFAULT_POSITION="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";const s=-1,o={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q"};t.SQUARES=["a8","b8","c8","d8","e8","f8","g8","h8","a7","b7","c7","d7","e7","f7","g7","h7","a6","b6","c6","d6","e6","f6","g6","h6","a5","b5","c5","d5","e5","f5","g5","h5","a4","b4","c4","d4","e4","f4","g4","h4","a3","b3","c3","d3","e3","f3","g3","h3","a2","b2","c2","d2","e2","f2","g2","h2","a1","b1","c1","d1","e1","f1","g1","h1"];const r={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64},i={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},n={b:[16,32,17,15],w:[-16,-32,-17,-15]},a={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},h=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],l=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],c={p:1,n:2,b:4,r:8,q:16,k:32},u=[t.KNIGHT,t.BISHOP,t.ROOK,t.QUEEN],d={w:[{square:i.a1,flag:r.QSIDE_CASTLE},{square:i.h1,flag:r.KSIDE_CASTLE}],b:[{square:i.a8,flag:r.QSIDE_CASTLE},{square:i.h8,flag:r.KSIDE_CASTLE}]},f={b:1,w:6},_=["1-0","0-1","1/2-1/2","*"];function p(e){return e>>4}function m(e){return 15&e}function g(e){return-1!=="0123456789".indexOf(e)}function v(e){const t=m(e),s=p(e);return"abcdefgh".substring(t,t+1)+"87654321".substring(s,s+1)}function b(e){return e===t.WHITE?t.BLACK:t.WHITE}function E(e){const t=[];t[0]="No errors.",t[1]="FEN string must contain six space-delimited fields.",t[2]="6th field (move number) must be a positive integer.",t[3]="5th field (half move counter) must be a non-negative integer.",t[4]="4th field (en-passant square) is invalid.",t[5]="3rd field (castling availability) is invalid.",t[6]="2nd field (side to move) is invalid.",t[7]="1st field (piece positions) does not contain 8 '/'-delimited rows.",t[8]="1st field (piece positions) is invalid [consecutive numbers].",t[9]="1st field (piece positions) is invalid [invalid piece].",t[10]="1st field (piece positions) is invalid [row too large].",t[11]="Illegal en-passant square";const s=e.split(/\s+/);if(6!==s.length)return{valid:!1,errorNumber:1,error:t[1]};const o=parseInt(s[5],10);if(isNaN(o)||o<=0)return{valid:!1,errorNumber:2,error:t[2]};const r=parseInt(s[4],10);if(isNaN(r)||r<0)return{valid:!1,errorNumber:3,error:t[3]};if(!/^(-|[abcdefgh][36])$/.test(s[3]))return{valid:!1,errorNumber:4,error:t[4]};if(!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(s[2]))return{valid:!1,errorNumber:5,error:t[5]};if(!/^(w|b)$/.test(s[1]))return{valid:!1,errorNumber:6,error:t[6]};const i=s[0].split("/");if(8!==i.length)return{valid:!1,errorNumber:7,error:t[7]};for(let e=0;e<i.length;e++){let s=0,o=!1;for(let r=0;r<i[e].length;r++)if(g(i[e][r])){if(o)return{valid:!1,errorNumber:8,error:t[8]};s+=parseInt(i[e][r],10),o=!0}else{if(!/^[prnbqkPRNBQK]$/.test(i[e][r]))return{valid:!1,errorNumber:9,error:t[9]};s+=1,o=!1}if(8!==s)return{valid:!1,errorNumber:10,error:t[10]}}return"3"==s[3][1]&&"w"==s[1]||"6"==s[3][1]&&"b"==s[1]?{valid:!1,errorNumber:11,error:t[11]}:{valid:!0,errorNumber:0,error:t[0]}}function N(e,s,o,i,n,a,h=r.NORMAL){const l=p(i);if(n!==t.PAWN||7!==l&&0!==l)e.push({color:s,from:o,to:i,piece:n,captured:a,promotion:void 0,flags:h});else for(let t=0;t<u.length;t++){const l=u[t];e.push({color:s,from:o,to:i,piece:n,captured:a,promotion:l,flags:h|r.PROMOTION})}}function S(e){let s=e.charAt(0);if(s>="a"&&s<="h"){if(e.match(/[a-h]\d.*[a-h]\d/))return;return t.PAWN}return s=s.toLowerCase(),"o"===s?t.KING:s}function A(e){return e.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}t.validateFen=E,t.Chess=class{constructor(e=t.DEFAULT_POSITION){this._board=new Array(128),this._turn=t.WHITE,this._header={},this._kings={w:s,b:s},this._epSquare=-1,this._halfMoves=0,this._moveNumber=0,this._history=[],this._comments={},this._castling={w:0,b:0},this.load(e)}clear(e=!1){this._board=new Array(128),this._kings={w:s,b:s},this._turn=t.WHITE,this._castling={w:0,b:0},this._epSquare=s,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=e?this._header:{},this._updateSetup(this.fen())}load(e,o=!1){const n=e.split(/\s+/),a=n[0];let h=0;if(!E(e).valid)return!1;this.clear(o);for(let e=0;e<a.length;e++){const s=a.charAt(e);if("/"===s)h+=8;else if(g(s))h+=parseInt(s,10);else{const e=s<"a"?t.WHITE:t.BLACK;this.put({type:s.toLowerCase(),color:e},v(h)),h++}}return this._turn=n[1],n[2].indexOf("K")>-1&&(this._castling.w|=r.KSIDE_CASTLE),n[2].indexOf("Q")>-1&&(this._castling.w|=r.QSIDE_CASTLE),n[2].indexOf("k")>-1&&(this._castling.b|=r.KSIDE_CASTLE),n[2].indexOf("q")>-1&&(this._castling.b|=r.QSIDE_CASTLE),this._epSquare="-"===n[3]?s:i[n[3]],this._halfMoves=parseInt(n[4],10),this._moveNumber=parseInt(n[5],10),this._updateSetup(this.fen()),!0}fen(){let e=0,o="";for(let s=i.a8;s<=i.h1;s++){if(this._board[s]){e>0&&(o+=e,e=0);const{color:r,type:i}=this._board[s];o+=r===t.WHITE?i.toUpperCase():i.toLowerCase()}else e++;s+1&136&&(e>0&&(o+=e),s!==i.h1&&(o+="/"),e=0,s+=8)}let n="";this._castling[t.WHITE]&r.KSIDE_CASTLE&&(n+="K"),this._castling[t.WHITE]&r.QSIDE_CASTLE&&(n+="Q"),this._castling[t.BLACK]&r.KSIDE_CASTLE&&(n+="k"),this._castling[t.BLACK]&r.QSIDE_CASTLE&&(n+="q"),n=n||"-";const a=this._epSquare===s?"-":v(this._epSquare);return[o,this._turn,n,a,this._halfMoves,this._moveNumber].join(" ")}_updateSetup(e){this._history.length>0||(e!==t.DEFAULT_POSITION?(this._header.SetUp="1",this._header.FEN=e):(delete this._header.SetUp,delete this._header.FEN))}reset(){this.load(t.DEFAULT_POSITION)}get(e){return this._board[i[e]]||!1}put({type:e,color:o},r){if(-1==="pnbrqkPNBRQK".indexOf(e.toLowerCase()))return!1;if(!(r in i))return!1;const n=i[r];return(e!=t.KING||this._kings[o]==s||this._kings[o]==n)&&(this._board[n]={type:e,color:o},e===t.KING&&(this._kings[o]=n),this._updateSetup(this.fen()),!0)}remove(e){const o=this.get(e);return delete this._board[i[e]],o&&o.type===t.KING&&(this._kings[o.color]=s),this._updateSetup(this.fen()),o}_attacked(e,s){for(let o=i.a8;o<=i.h1;o++){if(136&o){o+=7;continue}if(void 0===this._board[o]||this._board[o].color!==e)continue;const r=this._board[o],i=o-s,n=i+119;if(h[n]&c[r.type]){if(r.type===t.PAWN){if(i>0){if(r.color===t.WHITE)return!0}else if(r.color===t.BLACK)return!0;continue}if("n"===r.type||"k"===r.type)return!0;const e=l[n];let a=o+e,h=!1;for(;a!==s;){if(null!=this._board[a]){h=!0;break}a+=e}if(!h)return!0}}return!1}_isKingAttacked(e){return this._attacked(b(e),this._kings[e])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&0===this._moves().length}isStalemate(){return!this.isCheck()&&0===this._moves().length}isInsufficientMaterial(){const e={b:0,n:0,r:0,q:0,k:0,p:0},s=[];let o=0,r=0;for(let n=i.a8;n<=i.h1;n++){if(r=(r+1)%2,136&n){n+=7;continue}const i=this._board[n];i&&(e[i.type]=i.type in e?e[i.type]+1:1,i.type===t.BISHOP&&s.push(r),o++)}if(2===o)return!0;if(3===o&&(1===e[t.BISHOP]||1===e[t.KNIGHT]))return!0;if(o===e[t.BISHOP]+2){let e=0;const t=s.length;for(let o=0;o<t;o++)e+=s[o];if(0===e||e===t)return!0}return!1}isThreefoldRepetition(){const e=[],t={};let s=!1;for(;;){const t=this._undoMove();if(!t)break;e.push(t)}for(;;){const o=this.fen().split(" ").slice(0,4).join(" ");t[o]=o in t?t[o]+1:1,t[o]>=3&&(s=!0);const r=e.pop();if(!r)break;this._makeMove(r)}return s}isDraw(){return this._halfMoves>=100||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isStalemate()||this.isDraw()}moves({verbose:e=!1,square:t}={}){const s=this._moves({square:t});return e?s.map((e=>this._makePretty(e))):s.map((e=>this._moveToSan(e,s)))}_moves({legal:e=!0,piece:s,square:o}={}){var h;const l=o?o.toLowerCase():void 0,c=null==s?void 0:s.toLowerCase(),u=[],d=this._turn,_=b(d);let m=i.a8,g=i.h1,v=!1;if(l){if(!(l in i))return[];m=g=i[l],v=!0}for(let e=m;e<=g;e++){if(136&e){e+=7;continue}if(!this._board[e]||this._board[e].color===_)continue;const{type:s}=this._board[e];let o;if(s===t.PAWN){if(c&&c!==s)continue;o=e+n[d][0],this._board[o]||(N(u,d,e,o,t.PAWN),o=e+n[d][1],f[d]!==p(e)||this._board[o]||N(u,d,e,o,t.PAWN,void 0,r.BIG_PAWN));for(let s=2;s<4;s++)o=e+n[d][s],136&o||((null===(h=this._board[o])||void 0===h?void 0:h.color)===_?N(u,d,e,o,t.PAWN,this._board[o].type,r.CAPTURE):o===this._epSquare&&N(u,d,e,o,t.PAWN,t.PAWN,r.EP_CAPTURE))}else{if(c&&c!==s)continue;for(let i=0,n=a[s].length;i<n;i++){const n=a[s][i];for(o=e;o+=n,!(136&o);){if(this._board[o]){if(this._board[o].color===d)break;N(u,d,e,o,s,this._board[o].type,r.CAPTURE);break}if(N(u,d,e,o,s),s===t.KNIGHT||s===t.KING)break}}}}if(!(void 0!==c&&c!==t.KING||v&&g!==this._kings[d])){if(this._castling[d]&r.KSIDE_CASTLE){const e=this._kings[d],s=e+2;this._board[e+1]||this._board[s]||this._attacked(_,this._kings[d])||this._attacked(_,e+1)||this._attacked(_,s)||N(u,d,this._kings[d],s,t.KING,void 0,r.KSIDE_CASTLE)}if(this._castling[d]&r.QSIDE_CASTLE){const e=this._kings[d],s=e-2;this._board[e-1]||this._board[e-2]||this._board[e-3]||this._attacked(_,this._kings[d])||this._attacked(_,e-1)||this._attacked(_,s)||N(u,d,this._kings[d],s,t.KING,void 0,r.QSIDE_CASTLE)}}if(!e)return u;const E=[];for(let e=0,t=u.length;e<t;e++)this._makeMove(u[e]),this._isKingAttacked(d)||E.push(u[e]),this._undoMove();return E}move(e,{sloppy:t=!1}={}){let s=null;if("string"==typeof e)s=this._moveFromSan(e,t);else if("object"==typeof e){const t=this._moves();for(let o=0,r=t.length;o<r;o++)if(e.from===v(t[o].from)&&e.to===v(t[o].to)&&(!("promotion"in t[o])||e.promotion===t[o].promotion)){s=t[o];break}}if(!s)return null;const o=this._makePretty(s);return this._makeMove(s),o}_push(e){this._history.push({move:e,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_makeMove(e){const o=this._turn,i=b(o);if(this._push(e),this._board[e.to]=this._board[e.from],delete this._board[e.from],e.flags&r.EP_CAPTURE&&(this._turn===t.BLACK?delete this._board[e.to-16]:delete this._board[e.to+16]),e.promotion&&(this._board[e.to]={type:e.promotion,color:o}),this._board[e.to].type===t.KING){if(this._kings[o]=e.to,e.flags&r.KSIDE_CASTLE){const t=e.to-1,s=e.to+1;this._board[t]=this._board[s],delete this._board[s]}else if(e.flags&r.QSIDE_CASTLE){const t=e.to+1,s=e.to-2;this._board[t]=this._board[s],delete this._board[s]}this._castling[o]=0}if(this._castling[o])for(let t=0,s=d[o].length;t<s;t++)if(e.from===d[o][t].square&&this._castling[o]&d[o][t].flag){this._castling[o]^=d[o][t].flag;break}if(this._castling[i])for(let t=0,s=d[i].length;t<s;t++)if(e.to===d[i][t].square&&this._castling[i]&d[i][t].flag){this._castling[i]^=d[i][t].flag;break}e.flags&r.BIG_PAWN?o===t.BLACK?this._epSquare=e.to-16:this._epSquare=e.to+16:this._epSquare=s,e.piece===t.PAWN||e.flags&(r.CAPTURE|r.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,o===t.BLACK&&this._moveNumber++,this._turn=i}undo(){const e=this._undoMove();return e?this._makePretty(e):null}_undoMove(){const e=this._history.pop();if(void 0===e)return null;const s=e.move;this._kings=e.kings,this._turn=e.turn,this._castling=e.castling,this._epSquare=e.epSquare,this._halfMoves=e.halfMoves,this._moveNumber=e.moveNumber;const o=this._turn,i=b(o);if(this._board[s.from]=this._board[s.to],this._board[s.from].type=s.piece,delete this._board[s.to],s.captured)if(s.flags&r.EP_CAPTURE){let e;e=o===t.BLACK?s.to-16:s.to+16,this._board[e]={type:t.PAWN,color:i}}else this._board[s.to]={type:s.captured,color:i};if(s.flags&(r.KSIDE_CASTLE|r.QSIDE_CASTLE)){let e,t;s.flags&r.KSIDE_CASTLE?(e=s.to+1,t=s.to-1):(e=s.to-2,t=s.to+1),this._board[e]=this._board[t],delete this._board[t]}return s}pgn({newline:e="\n",maxWidth:t=0}={}){const s=[];let o=!1;for(const t in this._header)s.push("["+t+' "'+this._header[t]+'"]'+e),o=!0;o&&this._history.length&&s.push(e);const r=e=>{const t=this._comments[this.fen()];return void 0!==t&&(e=`${e}${e.length>0?" ":""}{${t}}`),e},i=[];for(;this._history.length>0;)i.push(this._undoMove());const n=[];let a="";for(0===i.length&&n.push(r(""));i.length>0;){a=r(a);const e=i.pop();if(!e)break;if(this._history.length||"b"!==e.color)"w"===e.color&&(a.length&&n.push(a),a=this._moveNumber+".");else{const e=`${this._moveNumber}. ...`;a=a?`${a} ${e}`:e}a=a+" "+this._moveToSan(e,this._moves({legal:!0})),this._makeMove(e)}if(a.length&&n.push(r(a)),void 0!==this._header.Result&&n.push(this._header.Result),0===t)return s.join("")+n.join(" ");const h=function(){return s.length>0&&" "===s[s.length-1]&&(s.pop(),!0)},l=function(o,r){for(const i of r.split(" "))if(i){if(o+i.length>t){for(;h();)o--;s.push(e),o=0}s.push(i),o+=i.length,s.push(" "),o++}return h()&&o--,o};let c=0;for(let o=0;o<n.length;o++)c+n[o].length>t&&n[o].includes("{")?c=l(c,n[o]):(c+n[o].length>t&&0!==o?(" "===s[s.length-1]&&s.pop(),s.push(e),c=0):0!==o&&(s.push(" "),c++),s.push(n[o]),c+=n[o].length);return s.join("")}header(...e){for(let t=0;t<e.length;t+=2)"string"==typeof e[t]&&"string"==typeof e[t+1]&&(this._header[e[t]]=e[t+1]);return this._header}loadPgn(e,{sloppy:t=!1,newlineChar:s="\r?\n"}={}){function o(e){return e.replace(/\\/g,"\\")}e=e.trim();const r=new RegExp("^(\\[((?:"+o(s)+")|.)*\\])(?:\\s*"+o(s)+"){2}").exec(e),i=r&&r.length>=2?r[1]:"";this.reset();const n=function(e){const t={},r=e.split(new RegExp(o(s)));let i="",n="";for(let e=0;e<r.length;e++){const s=/^\s*\[([A-Za-z]+)\s*"(.*)"\s*\]\s*$/;i=r[e].replace(s,"$1"),n=r[e].replace(s,"$2"),i.trim().length>0&&(t[i]=n)}return t}(i);let a="";for(const e in n)"fen"===e.toLowerCase()&&(a=n[e]),this.header(e,n[e]);if(t){if(a&&!this.load(a,!0))return!1}else if(!("1"!==n.SetUp||"FEN"in n&&this.load(n.FEN,!0)))return!1;const h=function(e){return`{${function(e){return Array.from(e).map((function(e){return e.charCodeAt(0)<128?e.charCodeAt(0).toString(16):encodeURIComponent(e).replace(/%/g,"").toLowerCase()})).join("")}((e=e.replace(new RegExp(o(s),"g")," ")).slice(1,e.length-1))}}`},l=function(e){if(e.startsWith("{")&&e.endsWith("}"))return function(e){return 0==e.length?"":decodeURIComponent("%"+(e.match(/.{1,2}/g)||[]).join("%"))}(e.slice(1,e.length-1))};let c=e.replace(i,"").replace(new RegExp(`({[^}]*})+?|;([^${o(s)}]*)`,"g"),(function(e,t,s){return void 0!==t?h(t):" "+h(`{${s.slice(1)}}`)})).replace(new RegExp(o(s),"g")," ");const u=/(\([^()]+\))+?/g;for(;u.test(c);)c=c.replace(u,"");c=c.replace(/\d+\.(\.\.)?/g,""),c=c.replace(/\.\.\./g,""),c=c.replace(/\$\d+/g,"");let d=c.trim().split(new RegExp(/\s+/));d=d.join(",").replace(/,,+/g,",").split(",");let f="";for(let e=0;e<d.length;e++){const s=l(d[e]);if(void 0!==s){this._comments[this.fen()]=s;continue}const o=this._moveFromSan(d[e],t);if(null==o){if(!(_.indexOf(d[e])>-1))return!1;f=d[e]}else f="",this._makeMove(o)}return f&&Object.keys(this._header).length&&!this._header.Result&&this.header("Result",f),!0}_moveToSan(e,s){let o="";if(e.flags&r.KSIDE_CASTLE)o="O-O";else if(e.flags&r.QSIDE_CASTLE)o="O-O-O";else{if(e.piece!==t.PAWN){const t=function(e,t){const s=e.from,o=e.to,r=e.piece;let i=0,n=0,a=0;for(let e=0,h=t.length;e<h;e++){const h=t[e].from,l=t[e].to;r===t[e].piece&&s!==h&&o===l&&(i++,p(s)===p(h)&&n++,m(s)===m(h)&&a++)}return i>0?n>0&&a>0?v(s):a>0?v(s).charAt(1):v(s).charAt(0):""}(e,s);o+=e.piece.toUpperCase()+t}e.flags&(r.CAPTURE|r.EP_CAPTURE)&&(e.piece===t.PAWN&&(o+=v(e.from)[0]),o+="x"),o+=v(e.to),e.promotion&&(o+="="+e.promotion.toUpperCase())}return this._makeMove(e),this.isCheck()&&(this.isCheckmate()?o+="#":o+="+"),this._undoMove(),o}_moveFromSan(e,t=!1){const s=A(e);let o,r,n,a,h,l=S(s),c=this._moves({legal:!0,piece:l});for(let e=0,t=c.length;e<t;e++)if(s===A(this._moveToSan(c[e],c)))return c[e];if(!t)return null;let u=!1;r=s.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),r?(o=r[1],n=r[2],a=r[3],h=r[4],1==n.length&&(u=!0)):(r=s.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),r&&(o=r[1],n=r[2],a=r[3],h=r[4],1==n.length&&(u=!0))),l=S(s),c=this._moves({legal:!0,piece:o||l});for(let e=0,t=c.length;e<t;e++)if(n&&a){if(!(o&&o.toLowerCase()!=c[e].piece||i[n]!=c[e].from||i[a]!=c[e].to||h&&h.toLowerCase()!=c[e].promotion))return c[e];if(u){const t=v(c[e].from);if(!(o&&o.toLowerCase()!=c[e].piece||i[a]!=c[e].to||n!=t[0]&&n!=t[1]||h&&h.toLowerCase()!=c[e].promotion))return c[e]}}return null}ascii(){let e="   +------------------------+\n";for(let s=i.a8;s<=i.h1;s++){if(0===m(s)&&(e+=" "+"87654321"[p(s)]+" |"),this._board[s]){const o=this._board[s].type;e+=" "+(this._board[s].color===t.WHITE?o.toUpperCase():o.toLowerCase())+" "}else e+=" . ";s+1&136&&(e+="|\n",s+=8)}return e+="   +------------------------+\n",e+="     a  b  c  d  e  f  g  h",e}perft(e){const t=this._moves({legal:!1});let s=0;const o=this._turn;for(let r=0,i=t.length;r<i;r++)this._makeMove(t[r]),this._isKingAttacked(o)||(e-1>0?s+=this.perft(e-1):s++),this._undoMove();return s}_makePretty(e){const{color:t,piece:s,from:i,to:n,flags:a,captured:h,promotion:l}=e;let c="";for(const e in r)r[e]&a&&(c+=o[e]);const u={color:t,piece:s,from:v(i),to:v(n),san:this._moveToSan(e,this._moves({legal:!0})),flags:c};return h&&(u.captured=h),l&&(u.promotion=l),u}turn(){return this._turn}board(){const e=[];let t=[];for(let s=i.a8;s<=i.h1;s++)null==this._board[s]?t.push(null):t.push({square:v(s),type:this._board[s].type,color:this._board[s].color}),s+1&136&&(e.push(t),t=[],s+=8);return e}squareColor(e){if(e in i){const t=i[e];return(p(t)+m(t))%2==0?"light":"dark"}return null}history({verbose:e=!1}={}){const t=[],s=[];for(;this._history.length>0;)t.push(this._undoMove());for(;;){const o=t.pop();if(!o)break;e?s.push(this._makePretty(o)):s.push(this._moveToSan(o,this._moves())),this._makeMove(o)}return s}_pruneComments(){const e=[],t={},s=e=>{e in this._comments&&(t[e]=this._comments[e])};for(;this._history.length>0;)e.push(this._undoMove());for(s(this.fen());;){const t=e.pop();if(!t)break;this._makeMove(t),s(this.fen())}this._comments=t}getComment(){return this._comments[this.fen()]}setComment(e){this._comments[this.fen()]=e.replace("{","[").replace("}","]")}deleteComment(){const e=this._comments[this.fen()];return delete this._comments[this.fen()],e}getComments(){return this._pruneComments(),Object.keys(this._comments).map((e=>({fen:e,comment:this._comments[e]})))}deleteComments(){return this._pruneComments(),Object.keys(this._comments).map((e=>{const t=this._comments[e];return delete this._comments[e],{fen:e,comment:t}}))}}}},t={};function s(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,s),i.exports}(()=>{var e=s(176),t=e.getAgent("random",0,!0),o=null,r=!1,i=!1,n=!0,a=new(s(938).Chess),h=0;function l(){return++h}function c(s){t=e.getAgent(s,l,!_)}function u(e,t,s,o){return!a.isGameOver()&&!!n&&(!_||-1===t.search(/^b/))&&!(!_&&-1!==t.search(/^w/))&&void 0}var d=null;function f(e,t){k=!0;var s=!1,o=null;if(firstLetter=t.split("")[1],firstLetter!==8..toString()&&"1"!==firstLetter||(piece=a.get(e),"p"===piece.type&&(s=!0,o=a.move({from:e,to:t,promotion:"q"}))),s||(o=a.move({from:e,to:t})),null===o)return"snapback";a.isGameOver()?console.log("Game over"):r=!0,d=o,i=!1,n=!1,window.setTimeout(N,0)}o=Chessboard("myBoard",{draggable:!0,position:"start",onDragStart:u,onDrop:f});var _=!0,p=document.getElementById("CompVComp"),m=document.getElementById("colorButton");p.addEventListener("click",(function(){!function(){const t=e.getAgent("random",1,!0),o=e.getAgent("random",2,!1);agent1Wins=0,agent2Wins=0,draws=0;for(let e=0;e<5;e++){const e=s(73).runGame(t,o,!1);null!=e?(result="Player "+e.id+" Wins",1===e.id?agent1Wins+=1:agent2Wins+=1):(result="Draw",draws+=1),console.log(result)}const r=agent1Wins+agent2Wins+draws,i=Math.pow(10,2);console.log("\nGames Played  :  "+r),console.log("Agent "+t.id+"       :  "+agent1Wins+" ("+Math.round((100*agent1Wins/r+Number.EPSILON)*i)/i+" %)"),console.log("Agent "+o.id+"       :  "+agent2Wins+" ("+Math.round((100*agent2Wins/r+Number.EPSILON)*i)/i+" %)"),console.log("Draws         :  "+draws+" ("+Math.round((100*draws/r+Number.EPSILON)*i)/i+" %)"),console.log("")}()}),!1),m.addEventListener("click",(function(){!function(){if(!k){t.WorB=_;var e="White";if(_=!_)s={draggable:!0,position:"start",onDragStart:u,onDrop:f},o=Chessboard("myBoard",s),n=!1;else{var s={draggable:!0,position:"start",orientation:"black",onDragStart:u,onDrop:f};o=Chessboard("myBoard",s),e="Black",k=!0,window.setTimeout(S(),250),n=!0}document.getElementById("playerColor").innerHTML="Playing as: "+e}}()}),!1);var g=document.getElementById("randomAgent"),v=document.getElementById("heuristicAgent"),b=document.getElementById("MCTSAgent");function E(e){if(!k){var t=!0;"random"===e?c("random"):"heuristic"===e?c("alwaysTake"):"MCTS"===e?c("MCTS"):t=!1,t&&console.log("Changing agent to '"+e+"'")}}function N(){o.position(a.fen()),i=!0}function S(){moves=null,t.requiresVerbose?moves=a.moves({verbose:!0}):moves=a.moves(),t.requiresLastPlayerMove&&t.setRootNode(d),nextMove=t.selectMove(a,moves),a.move(nextMove),window.setTimeout(N,0),n=!0}g.addEventListener("click",(function(){E("random")}),!1),v.addEventListener("click",(function(){E("heuristic")}),!1),b.addEventListener("click",(function(){E("MCTS")}),!1);var A=0;startDate=Date.now(),window.onload=function(){setInterval((function(){(Date.now()-startDate)/1e3>A&&A++,r&&(C<10?C++:i&&(S(),r=!1,C=0))}),1)};var C=0,k=!1})()})();