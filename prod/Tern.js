if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'Tern'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'Tern'.");
}
if (typeof this['kotlinx-coroutines-core'] === 'undefined') {
  throw new Error("Error loading module 'Tern'. Its dependency 'kotlinx-coroutines-core' was not found. Please, check whether 'kotlinx-coroutines-core' is loaded prior to 'Tern'.");
}
var Tern = function (_, Kotlin, $module$kotlinx_coroutines_core) {
  'use strict';
  var $$importsForInline$$ = _.$$importsForInline$$ || (_.$$importsForInline$$ = {});
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var equals = Kotlin.equals;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var IntRange = Kotlin.kotlin.ranges.IntRange;
  var toList = Kotlin.kotlin.collections.toList_7wnvza$;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Enum = Kotlin.kotlin.Enum;
  var throwISE = Kotlin.throwISE;
  var Kind_INTERFACE = Kotlin.Kind.INTERFACE;
  var Random = Kotlin.kotlin.random.Random_za3lpa$;
  var toMutableList = Kotlin.kotlin.collections.toMutableList_4c7yge$;
  var numberToInt = Kotlin.numberToInt;
  var random = Kotlin.kotlin.collections.random_iscd7z$;
  var until = Kotlin.kotlin.ranges.until_dqglrj$;
  var random_0 = Kotlin.kotlin.ranges.random_xmiyix$;
  var throwCCE = Kotlin.throwCCE;
  var Unit = Kotlin.kotlin.Unit;
  var coroutines = $module$kotlinx_coroutines_core.kotlinx.coroutines;
  var L500 = Kotlin.Long.fromInt(500);
  var delay = $module$kotlinx_coroutines_core.kotlinx.coroutines.delay_s8cxhz$;
  var COROUTINE_SUSPENDED = Kotlin.kotlin.coroutines.intrinsics.COROUTINE_SUSPENDED;
  var CoroutineImpl = Kotlin.kotlin.coroutines.CoroutineImpl;
  var launch = $module$kotlinx_coroutines_core.kotlinx.coroutines.launch_s496o7$;
  var getCallableRef = Kotlin.getCallableRef;
  var sum = Kotlin.kotlin.collections.sum_plj8ka$;
  var mutableListOf = Kotlin.kotlin.collections.mutableListOf_i5x0yv$;
  var defineInlineFunction = Kotlin.defineInlineFunction;
  var wrapFunction = Kotlin.wrapFunction;
  var abs = Kotlin.kotlin.math.abs_za3lpa$;
  var L200 = Kotlin.Long.fromInt(200);
  Alys.prototype = Object.create(BoardGame.prototype);
  Alys.prototype.constructor = Alys;
  AlysType.prototype = Object.create(Enum.prototype);
  AlysType.prototype.constructor = AlysType;
  AlysDisplay.prototype = Object.create(GameDisplay.prototype);
  AlysDisplay.prototype.constructor = AlysDisplay;
  Success.prototype = Object.create(Result.prototype);
  Success.prototype.constructor = Success;
  Failure.prototype = Object.create(Result.prototype);
  Failure.prototype.constructor = Failure;
  Chess.prototype = Object.create(BoardGame.prototype);
  Chess.prototype.constructor = Chess;
  ChessPieceType.prototype = Object.create(Enum.prototype);
  ChessPieceType.prototype.constructor = ChessPieceType;
  ChessPlayer.prototype = Object.create(Enum.prototype);
  ChessPlayer.prototype.constructor = ChessPlayer;
  ChessDisplay.prototype = Object.create(GameDisplay.prototype);
  ChessDisplay.prototype.constructor = ChessDisplay;
  TicTacToe.prototype = Object.create(BoardGame.prototype);
  TicTacToe.prototype.constructor = TicTacToe;
  TicTacToePiece.prototype = Object.create(Enum.prototype);
  TicTacToePiece.prototype.constructor = TicTacToePiece;
  TicTacToeDisplay.prototype = Object.create(GameDisplay.prototype);
  TicTacToeDisplay.prototype.constructor = TicTacToeDisplay;
  Virus.prototype = Object.create(BoardGame.prototype);
  Virus.prototype.constructor = Virus;
  VirusDisplay.prototype = Object.create(GameDisplay.prototype);
  VirusDisplay.prototype.constructor = VirusDisplay;
  function Alys(state) {
    Alys$Companion_getInstance();
    if (state === void 0)
      state = new AlysState();
    BoardGame.call(this);
    this.state_6qhq6m$_0 = state;
  }
  Object.defineProperty(Alys.prototype, 'state', {
    get: function () {
      return this.state_6qhq6m$_0;
    },
    set: function (state) {
      this.state_6qhq6m$_0 = state;
    }
  });
  function Alys$Companion() {
    Alys$Companion_instance = this;
    this.commonRules = listOf([new AlysRule('Cannot place piece outside board', Alys$Companion$commonRules$lambda), new AlysRule('Destination and origin cannot be the same place', Alys$Companion$commonRules$lambda_0), new AlysRule('Must move from a field', Alys$Companion$commonRules$lambda_1), new AlysRule('Must move to a field', Alys$Companion$commonRules$lambda_2), new AlysRule('Origin must belong to current player', Alys$Companion$commonRules$lambda_3), new AlysRule('Can only move pieces within or next to its area', Alys$Companion$commonRules$lambda_4)]);
    this.moveRules = listOf([new AlysRule('Must have a piece to move', Alys$Companion$moveRules$lambda), new AlysRule('Cannot move a piece more than once per turn', Alys$Companion$moveRules$lambda_0), new AlysRule('Can only move soldiers', Alys$Companion$moveRules$lambda_1), new AlysRule('Cannot move onto own forts', Alys$Companion$moveRules$lambda_2), new AlysRule('Cannot move onto own fully upgraded soldiers', Alys$Companion$moveRules$lambda_3), new AlysRule('Must be stronger than nearby pieces', Alys$Companion$moveRules$lambda_4)]);
    this.createRules = listOf([new AlysRule('Must have a base at origin', Alys$Companion$createRules$lambda), new AlysRule('Must be able to afford the piece', Alys$Companion$createRules$lambda_0), new AlysRule('Fort must be placed on a connected empty owned field', Alys$Companion$createRules$lambda_1)]);
  }
  Alys$Companion.prototype.priceOf_xryge9$ = function (type) {
    var tmp$;
    switch (type.name) {
      case 'Soldier':
        tmp$ = 10;
        break;
      case 'Fort':
        tmp$ = 15;
        break;
      default:tmp$ = 0;
        break;
    }
    return tmp$;
  };
  function Alys$Companion$commonRules$lambda(action, state, f) {
    return state.board.isWithinBounds_dfplqh$(action.origin) && state.board.isWithinBounds_dfplqh$(action.destination);
  }
  function Alys$Companion$commonRules$lambda_0(action, f, f_0) {
    var tmp$;
    return !((tmp$ = action.origin) != null ? tmp$.equals(action.destination) : null);
  }
  function Alys$Companion$commonRules$lambda_1(action, state, info) {
    var tmp$, tmp$_0;
    tmp$ = state.board.get_dfplqh$(action.origin);
    if (tmp$ == null) {
      return false;
    }
    info.originField = tmp$;
    info.originPiece = (tmp$_0 = info.originField) != null ? tmp$_0.piece : null;
    return true;
  }
  function Alys$Companion$commonRules$lambda_2(action, state, info) {
    var tmp$, tmp$_0;
    tmp$ = state.board.get_dfplqh$(action.destination);
    if (tmp$ == null) {
      return false;
    }
    info.destinationField = tmp$;
    info.destinationPiece = (tmp$_0 = info.destinationField) != null ? tmp$_0.piece : null;
    return true;
  }
  function Alys$Companion$commonRules$lambda_3(f, state, info) {
    var tmp$;
    return ((tmp$ = info.originField) != null ? tmp$.player : null) === state.currentPlayer;
  }
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_287e2$;
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var ArrayList_init_0 = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  function Alys$Companion$commonRules$lambda_4(action, state, f) {
    var tmp$;
    var originArea = AlysState$Companion_getInstance().connectedPositions_jwhin5$(action.origin, state.board);
    var allowedPositions = ArrayList_init();
    tmp$ = originArea.iterator();
    while (tmp$.hasNext()) {
      var place = tmp$.next();
      allowedPositions.addAll_brywnq$(place.position.adjacentHexes());
    }
    var destination = ArrayList_init_0(collectionSizeOrDefault(originArea, 10));
    var tmp$_0;
    tmp$_0 = originArea.iterator();
    while (tmp$_0.hasNext()) {
      var item = tmp$_0.next();
      destination.add_11rb$(item.position);
    }
    allowedPositions.addAll_brywnq$(destination);
    return allowedPositions.contains_11rb$(action.destination);
  }
  function Alys$Companion$moveRules$lambda(f, f_0, info) {
    return info.originPiece != null;
  }
  function Alys$Companion$moveRules$lambda_0(f, f_0, info) {
    var tmp$;
    return ((tmp$ = info.originPiece) != null ? tmp$.hasMoved : null) === false;
  }
  function Alys$Companion$moveRules$lambda_1(f, f_0, info) {
    var tmp$;
    return equals((tmp$ = info.originPiece) != null ? tmp$.type : null, AlysType$Soldier_getInstance());
  }
  function Alys$Companion$moveRules$lambda_2(f, state, info) {
    var tmp$, tmp$_0, tmp$_1;
    return state.currentPlayer !== ((tmp$ = info.destinationField) != null ? tmp$.player : null) || !equals((tmp$_1 = (tmp$_0 = info.destinationField) != null ? tmp$_0.piece : null) != null ? tmp$_1.type : null, AlysType$Fort_getInstance());
  }
  function Alys$Companion$moveRules$lambda_3(f, state, info) {
    var tmp$, tmp$_0;
    tmp$ = info.destinationPiece;
    if (tmp$ == null) {
      return true;
    }
    var piece = tmp$;
    return state.currentPlayer !== ((tmp$_0 = info.destinationField) != null ? tmp$_0.player : null) || piece.type === AlysType$Soldier_getInstance() || piece.strength < 4;
  }
  function Alys$Companion$moveRules$lambda_4(action, state, info) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    tmp$ = info.destinationField;
    if (tmp$ == null) {
      return false;
    }
    var destinationField = tmp$;
    if (destinationField.player === state.currentPlayer)
      return true;
    tmp$_1 = (tmp$_0 = info.originPiece) != null ? tmp$_0.strength : null;
    if (tmp$_1 == null) {
      return false;
    }
    var strength = tmp$_1;
    var defense = state.defenseOf_i615cl$(destinationField);
    var $receiver = action.destination.adjacentHexes();
    var destination = ArrayList_init();
    var tmp$_3;
    tmp$_3 = $receiver.iterator();
    while (tmp$_3.hasNext()) {
      var element = tmp$_3.next();
      if (state.board.isWithinBounds_dfplqh$(element))
        destination.add_11rb$(element);
    }
    var destination_0 = ArrayList_init_0(collectionSizeOrDefault(destination, 10));
    var tmp$_4;
    tmp$_4 = destination.iterator();
    while (tmp$_4.hasNext()) {
      var item = tmp$_4.next();
      destination_0.add_11rb$(state.board.get_dfplqh$(item));
    }
    var destination_1 = ArrayList_init();
    var tmp$_5;
    tmp$_5 = destination_0.iterator();
    while (tmp$_5.hasNext()) {
      var element_0 = tmp$_5.next();
      if (element_0 != null && element_0.player === destinationField.player)
        destination_1.add_11rb$(element_0);
    }
    var destination_2 = ArrayList_init_0(collectionSizeOrDefault(destination_1, 10));
    var tmp$_6;
    tmp$_6 = destination_1.iterator();
    while (tmp$_6.hasNext()) {
      var item_0 = tmp$_6.next();
      destination_2.add_11rb$(item_0 == null ? 0 : state.defenseOf_i615cl$(item_0));
    }
    var defenses = destination_2;
    tmp$_2 = defenses.iterator();
    while (tmp$_2.hasNext()) {
      var def = tmp$_2.next();
      if (def > defense)
        defense = def;
    }
    if (strength <= defense)
      return false;
    return true;
  }
  function Alys$Companion$createRules$lambda(f, f_0, info) {
    var tmp$;
    return ((tmp$ = info.originField) != null ? tmp$.treasury : null) != null;
  }
  function Alys$Companion$createRules$lambda_0(action, f, info) {
    var tmp$, tmp$_0;
    return Alys$Companion_getInstance().priceOf_xryge9$(action.type) <= ((tmp$_0 = (tmp$ = info.originField) != null ? tmp$.treasury : null) != null ? tmp$_0 : 0);
  }
  function Alys$Companion$createRules$lambda_1(action, state, info) {
    var tmp$;
    if (action.type !== AlysType$Fort_getInstance())
      return true;
    return state.isConnected_vwqnnw$(action.origin, action.destination) && ((tmp$ = info.destinationField) != null ? tmp$.player : null) === state.currentPlayer;
  }
  Alys$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Alys$Companion_instance = null;
  function Alys$Companion_getInstance() {
    if (Alys$Companion_instance === null) {
      new Alys$Companion();
    }
    return Alys$Companion_instance;
  }
  Alys.prototype.newGame_qt1dr2$ = function (width, height, seed) {
    if (width === void 0)
      width = 10;
    if (height === void 0)
      height = 10;
    if (seed === void 0)
      seed = 1;
    var creator = new AlysBoardCreator(width, height, seed);
    creator.generateLand();
    creator.fillBoard_za3lpa$(this.players.size);
    this.state = new AlysState(width, height, this.players.size, creator.board, 1, toList(new IntRange(1, this.players.size)));
  };
  Alys.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Alys',
    interfaces: [BoardGame]
  };
  function AlysField(player, piece, treasury) {
    if (piece === void 0)
      piece = null;
    if (treasury === void 0)
      treasury = null;
    this.player = player;
    this.piece = piece;
    this.treasury = treasury;
  }
  AlysField.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysField',
    interfaces: []
  };
  AlysField.prototype.component1 = function () {
    return this.player;
  };
  AlysField.prototype.component2 = function () {
    return this.piece;
  };
  AlysField.prototype.component3 = function () {
    return this.treasury;
  };
  AlysField.prototype.copy_jcygvj$ = function (player, piece, treasury) {
    return new AlysField(player === void 0 ? this.player : player, piece === void 0 ? this.piece : piece, treasury === void 0 ? this.treasury : treasury);
  };
  AlysField.prototype.toString = function () {
    return 'AlysField(player=' + Kotlin.toString(this.player) + (', piece=' + Kotlin.toString(this.piece)) + (', treasury=' + Kotlin.toString(this.treasury)) + ')';
  };
  AlysField.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.player) | 0;
    result = result * 31 + Kotlin.hashCode(this.piece) | 0;
    result = result * 31 + Kotlin.hashCode(this.treasury) | 0;
    return result;
  };
  AlysField.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.player, other.player) && Kotlin.equals(this.piece, other.piece) && Kotlin.equals(this.treasury, other.treasury)))));
  };
  function AlysPiece(type, strength, hasMoved) {
    if (strength === void 0)
      strength = 1;
    if (hasMoved === void 0)
      hasMoved = false;
    this.type = type;
    this.strength = strength;
    this.hasMoved = hasMoved;
  }
  AlysPiece.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysPiece',
    interfaces: []
  };
  AlysPiece.prototype.component1 = function () {
    return this.type;
  };
  AlysPiece.prototype.component2 = function () {
    return this.strength;
  };
  AlysPiece.prototype.component3 = function () {
    return this.hasMoved;
  };
  AlysPiece.prototype.copy_thel6g$ = function (type, strength, hasMoved) {
    return new AlysPiece(type === void 0 ? this.type : type, strength === void 0 ? this.strength : strength, hasMoved === void 0 ? this.hasMoved : hasMoved);
  };
  AlysPiece.prototype.toString = function () {
    return 'AlysPiece(type=' + Kotlin.toString(this.type) + (', strength=' + Kotlin.toString(this.strength)) + (', hasMoved=' + Kotlin.toString(this.hasMoved)) + ')';
  };
  AlysPiece.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.type) | 0;
    result = result * 31 + Kotlin.hashCode(this.strength) | 0;
    result = result * 31 + Kotlin.hashCode(this.hasMoved) | 0;
    return result;
  };
  AlysPiece.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.type, other.type) && Kotlin.equals(this.strength, other.strength) && Kotlin.equals(this.hasMoved, other.hasMoved)))));
  };
  function AlysType(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function AlysType_initFields() {
    AlysType_initFields = function () {
    };
    AlysType$Fort_instance = new AlysType('Fort', 0);
    AlysType$Soldier_instance = new AlysType('Soldier', 1);
    AlysType$Grave_instance = new AlysType('Grave', 2);
    AlysType$Tree_instance = new AlysType('Tree', 3);
    AlysType$CoastTree_instance = new AlysType('CoastTree', 4);
  }
  var AlysType$Fort_instance;
  function AlysType$Fort_getInstance() {
    AlysType_initFields();
    return AlysType$Fort_instance;
  }
  var AlysType$Soldier_instance;
  function AlysType$Soldier_getInstance() {
    AlysType_initFields();
    return AlysType$Soldier_instance;
  }
  var AlysType$Grave_instance;
  function AlysType$Grave_getInstance() {
    AlysType_initFields();
    return AlysType$Grave_instance;
  }
  var AlysType$Tree_instance;
  function AlysType$Tree_getInstance() {
    AlysType_initFields();
    return AlysType$Tree_instance;
  }
  var AlysType$CoastTree_instance;
  function AlysType$CoastTree_getInstance() {
    AlysType_initFields();
    return AlysType$CoastTree_instance;
  }
  AlysType.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysType',
    interfaces: [Enum]
  };
  function AlysType$values() {
    return [AlysType$Fort_getInstance(), AlysType$Soldier_getInstance(), AlysType$Grave_getInstance(), AlysType$Tree_getInstance(), AlysType$CoastTree_getInstance()];
  }
  AlysType.values = AlysType$values;
  function AlysType$valueOf(name) {
    switch (name) {
      case 'Fort':
        return AlysType$Fort_getInstance();
      case 'Soldier':
        return AlysType$Soldier_getInstance();
      case 'Grave':
        return AlysType$Grave_getInstance();
      case 'Tree':
        return AlysType$Tree_getInstance();
      case 'CoastTree':
        return AlysType$CoastTree_getInstance();
      default:throwISE('No enum constant AlysType.' + name);
    }
  }
  AlysType.valueOf_61zpoe$ = AlysType$valueOf;
  function AlysAction() {
  }
  AlysAction.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'AlysAction',
    interfaces: []
  };
  function WithOriginAndDestination() {
  }
  WithOriginAndDestination.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'WithOriginAndDestination',
    interfaces: [AlysAction]
  };
  function AlysMoveAction(origin, destination) {
    this.origin_1pmuoi$_0 = origin;
    this.destination_kdznma$_0 = destination;
  }
  Object.defineProperty(AlysMoveAction.prototype, 'origin', {
    get: function () {
      return this.origin_1pmuoi$_0;
    }
  });
  Object.defineProperty(AlysMoveAction.prototype, 'destination', {
    get: function () {
      return this.destination_kdznma$_0;
    }
  });
  AlysMoveAction.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysMoveAction',
    interfaces: [WithOriginAndDestination, AlysAction]
  };
  AlysMoveAction.prototype.component1 = function () {
    return this.origin;
  };
  AlysMoveAction.prototype.component2 = function () {
    return this.destination;
  };
  AlysMoveAction.prototype.copy_vwqnnw$ = function (origin, destination) {
    return new AlysMoveAction(origin === void 0 ? this.origin : origin, destination === void 0 ? this.destination : destination);
  };
  AlysMoveAction.prototype.toString = function () {
    return 'AlysMoveAction(origin=' + Kotlin.toString(this.origin) + (', destination=' + Kotlin.toString(this.destination)) + ')';
  };
  AlysMoveAction.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.origin) | 0;
    result = result * 31 + Kotlin.hashCode(this.destination) | 0;
    return result;
  };
  AlysMoveAction.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.origin, other.origin) && Kotlin.equals(this.destination, other.destination)))));
  };
  function AlysCreateAction(type, origin, destination) {
    this.type = type;
    this.origin_n7cp6r$_0 = origin;
    this.destination_1a1p0j$_0 = destination;
  }
  Object.defineProperty(AlysCreateAction.prototype, 'origin', {
    get: function () {
      return this.origin_n7cp6r$_0;
    }
  });
  Object.defineProperty(AlysCreateAction.prototype, 'destination', {
    get: function () {
      return this.destination_1a1p0j$_0;
    }
  });
  AlysCreateAction.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysCreateAction',
    interfaces: [WithOriginAndDestination, AlysAction]
  };
  AlysCreateAction.prototype.component1 = function () {
    return this.type;
  };
  AlysCreateAction.prototype.component2 = function () {
    return this.origin;
  };
  AlysCreateAction.prototype.component3 = function () {
    return this.destination;
  };
  AlysCreateAction.prototype.copy_yn4ggv$ = function (type, origin, destination) {
    return new AlysCreateAction(type === void 0 ? this.type : type, origin === void 0 ? this.origin : origin, destination === void 0 ? this.destination : destination);
  };
  AlysCreateAction.prototype.toString = function () {
    return 'AlysCreateAction(type=' + Kotlin.toString(this.type) + (', origin=' + Kotlin.toString(this.origin)) + (', destination=' + Kotlin.toString(this.destination)) + ')';
  };
  AlysCreateAction.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.type) | 0;
    result = result * 31 + Kotlin.hashCode(this.origin) | 0;
    result = result * 31 + Kotlin.hashCode(this.destination) | 0;
    return result;
  };
  AlysCreateAction.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.type, other.type) && Kotlin.equals(this.origin, other.origin) && Kotlin.equals(this.destination, other.destination)))));
  };
  function AlysEndTurnAction() {
  }
  AlysEndTurnAction.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysEndTurnAction',
    interfaces: [AlysAction]
  };
  function AlysRule(description, isLegal) {
    this.description = description;
    this.isLegal = isLegal;
  }
  AlysRule.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysRule',
    interfaces: []
  };
  AlysRule.prototype.component1 = function () {
    return this.description;
  };
  AlysRule.prototype.component2 = function () {
    return this.isLegal;
  };
  AlysRule.prototype.copy_84vu4z$ = function (description, isLegal) {
    return new AlysRule(description === void 0 ? this.description : description, isLegal === void 0 ? this.isLegal : isLegal);
  };
  AlysRule.prototype.toString = function () {
    return 'AlysRule(description=' + Kotlin.toString(this.description) + (', isLegal=' + Kotlin.toString(this.isLegal)) + ')';
  };
  AlysRule.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.description) | 0;
    result = result * 31 + Kotlin.hashCode(this.isLegal) | 0;
    return result;
  };
  AlysRule.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.description, other.description) && Kotlin.equals(this.isLegal, other.isLegal)))));
  };
  function AlysActionInfo(originField, destinationField, originPiece, destinationPiece) {
    if (originField === void 0)
      originField = null;
    if (destinationField === void 0)
      destinationField = null;
    if (originPiece === void 0)
      originPiece = null;
    if (destinationPiece === void 0)
      destinationPiece = null;
    this.originField = originField;
    this.destinationField = destinationField;
    this.originPiece = originPiece;
    this.destinationPiece = destinationPiece;
  }
  AlysActionInfo.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysActionInfo',
    interfaces: []
  };
  AlysActionInfo.prototype.component1 = function () {
    return this.originField;
  };
  AlysActionInfo.prototype.component2 = function () {
    return this.destinationField;
  };
  AlysActionInfo.prototype.component3 = function () {
    return this.originPiece;
  };
  AlysActionInfo.prototype.component4 = function () {
    return this.destinationPiece;
  };
  AlysActionInfo.prototype.copy_4cfln8$ = function (originField, destinationField, originPiece, destinationPiece) {
    return new AlysActionInfo(originField === void 0 ? this.originField : originField, destinationField === void 0 ? this.destinationField : destinationField, originPiece === void 0 ? this.originPiece : originPiece, destinationPiece === void 0 ? this.destinationPiece : destinationPiece);
  };
  AlysActionInfo.prototype.toString = function () {
    return 'AlysActionInfo(originField=' + Kotlin.toString(this.originField) + (', destinationField=' + Kotlin.toString(this.destinationField)) + (', originPiece=' + Kotlin.toString(this.originPiece)) + (', destinationPiece=' + Kotlin.toString(this.destinationPiece)) + ')';
  };
  AlysActionInfo.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.originField) | 0;
    result = result * 31 + Kotlin.hashCode(this.destinationField) | 0;
    result = result * 31 + Kotlin.hashCode(this.originPiece) | 0;
    result = result * 31 + Kotlin.hashCode(this.destinationPiece) | 0;
    return result;
  };
  AlysActionInfo.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.originField, other.originField) && Kotlin.equals(this.destinationField, other.destinationField) && Kotlin.equals(this.originPiece, other.originPiece) && Kotlin.equals(this.destinationPiece, other.destinationPiece)))));
  };
  function AlysBoardCreator(width, height, seed) {
    this.seed = seed;
    this.board = new Grid(width, height, AlysBoardCreator$board$lambda);
    this.numberOfCenters = 3;
    this.landFraction = 0.8;
  }
  var Collection = Kotlin.kotlin.collections.Collection;
  AlysBoardCreator.prototype.generateLand = function () {
    var tmp$;
    var random_0 = Random(this.seed);
    var remainingPositions = toMutableList(this.board.positions());
    var centers = this.generateCenters_0(remainingPositions, random_0);
    var createdFields = toMutableList(centers);
    var fieldsToCreate = numberToInt(this.board.fields.size * this.landFraction);
    loop_label: while (createdFields.size < fieldsToCreate) {
      var position = random(remainingPositions, random_0);
      var $receiver = position.adjacentHexes();
      var any$result;
      any$break: do {
        var tmp$_0;
        if (Kotlin.isType($receiver, Collection) && $receiver.isEmpty()) {
          any$result = false;
          break any$break;
        }
        tmp$_0 = $receiver.iterator();
        while (tmp$_0.hasNext()) {
          var element = tmp$_0.next();
          if (createdFields.contains_11rb$(element)) {
            any$result = true;
            break any$break;
          }
        }
        any$result = false;
      }
       while (false);
      if (any$result) {
        createdFields.add_11rb$(position);
        remainingPositions.remove_11rb$(position);
      }
    }
    tmp$ = createdFields.iterator();
    while (tmp$.hasNext()) {
      var position_0 = tmp$.next();
      this.board.set_39d550$(position_0, new AlysField(0));
    }
  };
  AlysBoardCreator.prototype.generateCenters_0 = function (remainingPositions, random) {
    var tmp$;
    var centers = ArrayList_init();
    tmp$ = this.numberOfCenters;
    for (var i = 1; i <= tmp$; i++) {
      var index = random_0(until(0, remainingPositions.size), random);
      centers.add_11rb$(remainingPositions.removeAt_za3lpa$(index));
    }
    return centers;
  };
  AlysBoardCreator.prototype.fillBoard_za3lpa$ = function (playerCount) {
    var tmp$;
    var random_1 = Random(this.seed);
    var $receiver = this.board.positionedFields();
    var destination = ArrayList_init();
    var tmp$_0;
    tmp$_0 = $receiver.iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      if (element.field != null)
        destination.add_11rb$(element);
    }
    var destination_0 = ArrayList_init_0(collectionSizeOrDefault(destination, 10));
    var tmp$_1;
    tmp$_1 = destination.iterator();
    while (tmp$_1.hasNext()) {
      var item = tmp$_1.next();
      destination_0.add_11rb$(item.position);
    }
    var remainingPositions = toMutableList(destination_0);
    while (remainingPositions.size > 0) {
      for (var player = 1; player <= playerCount; player++) {
        var index = random_0(until(0, remainingPositions.size), random_1);
        this.board.set_39d550$(remainingPositions.removeAt_za3lpa$(index), new AlysField(player));
      }
    }
    var examinedArea = ArrayList_init();
    tmp$ = this.board.positions().iterator();
    loop_label: while (tmp$.hasNext()) {
      var position = tmp$.next();
      var any$result;
      any$break: do {
        var tmp$_2;
        if (Kotlin.isType(examinedArea, Collection) && examinedArea.isEmpty()) {
          any$result = false;
          break any$break;
        }
        tmp$_2 = examinedArea.iterator();
        while (tmp$_2.hasNext()) {
          var element_0 = tmp$_2.next();
          var tmp$_3;
          if ((tmp$_3 = element_0.position) != null ? tmp$_3.equals(position) : null) {
            any$result = true;
            break any$break;
          }
        }
        any$result = false;
      }
       while (false);
      if (any$result)
        continue loop_label;
      var area = AlysState$Companion_getInstance().connectedPositions_jwhin5$(position, this.board);
      examinedArea.addAll_brywnq$(area);
      if (area.size < 2)
        continue loop_label;
      var base = random(area, random_1);
      var tmp$_4 = this.board;
      var tmp$_5 = base.position;
      var tmp$_6 = base.field;
      var tmp$_7 = void 0;
      var tmp$_8 = void 0;
      var destination_1 = ArrayList_init();
      var tmp$_9;
      tmp$_9 = area.iterator();
      while (tmp$_9.hasNext()) {
        var element_1 = tmp$_9.next();
        if (element_1.field.piece == null)
          destination_1.add_11rb$(element_1);
      }
      tmp$_4.set_39d550$(tmp$_5, tmp$_6.copy_jcygvj$(tmp$_7, tmp$_8, destination_1.size * 5 | 0));
    }
  };
  function AlysBoardCreator$board$lambda(f, f_0) {
    return null;
  }
  AlysBoardCreator.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysBoardCreator',
    interfaces: []
  };
  var LinkedHashMap_init = Kotlin.kotlin.collections.LinkedHashMap_init_q3lmfv$;
  var Random_0 = Kotlin.kotlin.random.Random;
  function AlysDisplay(canvas, playerArea, gameArea) {
    GameDisplay.call(this, canvas, playerArea, gameArea);
    this.game_6mofcn$_0 = new Alys();
    this.originPosition = null;
    this.buildType = null;
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    this.fortButton_0 = Kotlin.isType(tmp$ = document.createElement('button'), HTMLButtonElement) ? tmp$ : throwCCE();
    this.soldierButton_0 = Kotlin.isType(tmp$_0 = document.createElement('button'), HTMLButtonElement) ? tmp$_0 : throwCCE();
    this.undoButton_0 = Kotlin.isType(tmp$_1 = document.createElement('button'), HTMLButtonElement) ? tmp$_1 : throwCCE();
    this.endTurnButton_0 = Kotlin.isType(tmp$_2 = document.createElement('button'), HTMLButtonElement) ? tmp$_2 : throwCCE();
    this.statusArea_0 = Kotlin.isType(tmp$_3 = document.createElement('div'), HTMLDivElement) ? tmp$_3 : throwCCE();
    this.images = LinkedHashMap_init();
    this.getColor_vm40yk$_0 = AlysDisplay$getColor$lambda(this);
    this.draw_6lbnvp$_0 = AlysDisplay$draw$lambda(this);
    var context = Kotlin.isType(tmp$_4 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_4 : throwCCE();
    context.imageSmoothingEnabled = false;
    this.addImage_61zpoe$('S1');
    this.addImage_61zpoe$('S1R');
    this.addImage_61zpoe$('S2');
    this.addImage_61zpoe$('S2R');
    this.addImage_61zpoe$('S3');
    this.addImage_61zpoe$('S3R');
    this.addImage_61zpoe$('S4');
    this.addImage_61zpoe$('S4R');
    this.addImage_61zpoe$('B');
    this.addImage_61zpoe$('BR');
    this.addImage_61zpoe$('F');
    this.addImage_61zpoe$('T');
    this.addImage_61zpoe$('C');
    this.addImage_61zpoe$('G');
    launch(coroutines.GlobalScope, void 0, void 0, AlysDisplay_init$lambda(this));
    var $receiver = this.game.players;
    var value = 'Player 1';
    $receiver.put_xwzc9p$(1, value);
    var $receiver_0 = this.players;
    var key = 'Player 1';
    var value_0 = new Player();
    $receiver_0.put_xwzc9p$(key, value_0);
    var $receiver_1 = this.game.players;
    var value_1 = 'Player 2';
    $receiver_1.put_xwzc9p$(2, value_1);
    var $receiver_2 = this.players;
    var key_0 = 'Player 2';
    var value_2 = new Player();
    $receiver_2.put_xwzc9p$(key_0, value_2);
    var $receiver_3 = this.game.players;
    var value_3 = 'Player 3';
    $receiver_3.put_xwzc9p$(3, value_3);
    var $receiver_4 = this.players;
    var key_1 = 'Player 3';
    var value_4 = new Player();
    $receiver_4.put_xwzc9p$(key_1, value_4);
    var $receiver_5 = this.game.players;
    var value_5 = 'Player 4';
    $receiver_5.put_xwzc9p$(4, value_5);
    var $receiver_6 = this.players;
    var key_2 = 'Player 4';
    var value_6 = new Player();
    $receiver_6.put_xwzc9p$(key_2, value_6);
    this.game.newGame_qt1dr2$(void 0, void 0, random_0(new IntRange(0, 100000), Random_0.Default));
    this.gridDisplay.gridColor = 'blue';
    this.gridDisplay.fieldSize = 39.0;
    this.gridDisplay.outerBorder = 50.0;
    this.gridDisplay.showHexagons();
    gameArea.appendChild(this.fortButton_0);
    gameArea.appendChild(this.soldierButton_0);
    gameArea.appendChild(this.undoButton_0);
    gameArea.appendChild(this.endTurnButton_0);
    gameArea.appendChild(this.statusArea_0);
    this.fortButton_0.textContent = 'Build fort';
    this.soldierButton_0.textContent = 'Hire soldier';
    this.undoButton_0.textContent = 'Undo';
    this.endTurnButton_0.textContent = 'End turn';
    this.fortButton_0.addEventListener('click', getCallableRef('buildFort', function ($receiver, event) {
      return $receiver.buildFort_0(event), Unit;
    }.bind(null, this)));
    this.soldierButton_0.addEventListener('click', getCallableRef('hireSoldier', function ($receiver, event) {
      return $receiver.hireSoldier_0(event), Unit;
    }.bind(null, this)));
    this.undoButton_0.addEventListener('click', getCallableRef('undo', function ($receiver, event) {
      return $receiver.undo_0(event), Unit;
    }.bind(null, this)));
    this.endTurnButton_0.addEventListener('click', getCallableRef('endTurn', function ($receiver, event) {
      return $receiver.endTurn_0(event), Unit;
    }.bind(null, this)));
    this.updateDisplay_pdl1vj$(null);
    this.gridDisplay.onClick = AlysDisplay_init$lambda_0(this);
  }
  Object.defineProperty(AlysDisplay.prototype, 'game', {
    get: function () {
      return this.game_6mofcn$_0;
    },
    set: function (game) {
      this.game_6mofcn$_0 = game;
    }
  });
  Object.defineProperty(AlysDisplay.prototype, 'getColor', {
    get: function () {
      return this.getColor_vm40yk$_0;
    }
  });
  Object.defineProperty(AlysDisplay.prototype, 'draw', {
    get: function () {
      return this.draw_6lbnvp$_0;
    }
  });
  AlysDisplay.prototype.soldierImage_vz30o2$ = function (piece, showReady) {
    var tmp$;
    var flag = piece.hasMoved || !showReady ? '' : 'R';
    switch (piece.strength) {
      case 1:
        tmp$ = 'S1' + flag;
        break;
      case 2:
        tmp$ = 'S2' + flag;
        break;
      case 3:
        tmp$ = 'S3' + flag;
        break;
      case 4:
        tmp$ = 'S4' + flag;
        break;
      default:tmp$ = 'S1' + flag;
        break;
    }
    return tmp$;
  };
  AlysDisplay.prototype.addImage_61zpoe$ = function (name) {
    var tmp$, tmp$_0;
    var $receiver = this.images;
    var value = Kotlin.isType(tmp$ = document.createElement('img'), HTMLImageElement) ? tmp$ : throwCCE();
    $receiver.put_xwzc9p$(name, value);
    (tmp$_0 = this.images.get_11rb$(name)) != null ? (tmp$_0.src = 'assets/' + name + '.png') : null;
  };
  AlysDisplay.prototype.updateDisplay_pdl1vj$ = function (winner) {
    if (winner != null)
      this.messageLine.textContent = winner + ' has won!';
    else
      this.turnLine.textContent = 'Current player: ' + this.game.currentPlayer();
    this.gridDisplay.display_31tjs9$(this.game.state.board, this.getColor, this.draw);
    this.updatePlayerList();
    this.updateButtons_0();
  };
  AlysDisplay.prototype.updateButtons_0 = function () {
    var tmp$;
    var source = this.originPosition;
    if (source != null && ((tmp$ = this.game.state.board.get_dfplqh$(source)) != null ? tmp$.treasury : null) != null) {
      this.fortButton_0.disabled = equals(this.buildType, AlysType$Fort_getInstance());
      this.soldierButton_0.disabled = equals(this.buildType, AlysType$Soldier_getInstance());
    }
     else {
      this.fortButton_0.disabled = true;
      this.soldierButton_0.disabled = true;
    }
    this.undoButton_0.disabled = true;
  };
  AlysDisplay.prototype.hireSoldier_0 = function (event) {
    this.buildType = AlysType$Soldier_getInstance();
    this.updateButtons_0();
  };
  AlysDisplay.prototype.buildFort_0 = function (event) {
    this.buildType = AlysType$Fort_getInstance();
    this.updateButtons_0();
  };
  AlysDisplay.prototype.undo_0 = function (event) {
  };
  AlysDisplay.prototype.endTurn_0 = function (event) {
    this.performAction_11re$(new AlysEndTurnAction());
  };
  function AlysDisplay$getColor$lambda(this$AlysDisplay) {
    return function (f, x, y) {
      var tmp$, tmp$_0;
      var origin = this$AlysDisplay.originPosition;
      if (origin != null && origin.x === x && origin.y === y)
        return 'darkgrey';
      tmp$ = this$AlysDisplay.game.state.board.get_vux9f0$(x, y);
      if (tmp$ == null) {
        return 'transparent';
      }
      var piece = tmp$;
      switch (piece.player) {
        case 1:
          tmp$_0 = 'yellow';
          break;
        case 2:
          tmp$_0 = 'green';
          break;
        case 3:
          tmp$_0 = 'lightgreen';
          break;
        case 4:
          tmp$_0 = 'orange';
          break;
        default:tmp$_0 = 'white';
          break;
      }
      return tmp$_0;
    };
  }
  function AlysDisplay$draw$lambda(this$AlysDisplay) {
    return function (context, fieldSize, field, f, f_0) {
      var tmp$, tmp$_0, tmp$_1;
      if (field == null)
        return;
      context.fillStyle = 'black';
      context.font = fieldSize.toString() + 'px arial';
      context.textBaseline = 'top';
      tmp$_0 = (tmp$ = field.piece) != null ? tmp$.type : null;
      if (equals(tmp$_0, AlysType$Fort_getInstance()))
        tmp$_1 = 'F';
      else if (equals(tmp$_0, AlysType$Soldier_getInstance()))
        tmp$_1 = this$AlysDisplay.soldierImage_vz30o2$(field.piece, field.player === this$AlysDisplay.game.state.currentPlayer);
      else if (equals(tmp$_0, AlysType$Tree_getInstance()))
        tmp$_1 = 'T';
      else if (equals(tmp$_0, AlysType$CoastTree_getInstance()))
        tmp$_1 = 'C';
      else if (equals(tmp$_0, AlysType$Grave_getInstance()))
        tmp$_1 = 'G';
      else
        tmp$_1 = field.treasury != null && field.treasury >= 10 && field.player === this$AlysDisplay.game.state.currentPlayer ? 'BR' : field.treasury != null ? 'B' : null;
      var image = tmp$_1;
      if (image != null)
        context.drawImage(this$AlysDisplay.images.get_11rb$(image), 0.0, 0.0, fieldSize, fieldSize);
      return Unit;
    };
  }
  function AlysDisplay_init$lambda(this$AlysDisplay_0) {
    return function ($receiver, continuation_0, suspended) {
      var instance = new Coroutine$AlysDisplay_init$lambda(this$AlysDisplay_0, $receiver, this, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$AlysDisplay_init$lambda(this$AlysDisplay_0, $receiver, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
    this.local$this$AlysDisplay = this$AlysDisplay_0;
  }
  Coroutine$AlysDisplay_init$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$AlysDisplay_init$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$AlysDisplay_init$lambda.prototype.constructor = Coroutine$AlysDisplay_init$lambda;
  Coroutine$AlysDisplay_init$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.state_0 = 2;
            this.result_0 = delay(L500, this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            return this.local$this$AlysDisplay.updateDisplay_pdl1vj$(null), Unit;
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  var Map = Kotlin.kotlin.collections.Map;
  function AlysDisplay_init$lambda_0(this$AlysDisplay) {
    return function (it) {
      var tmp$, tmp$_0, tmp$_1, tmp$_2;
      var $receiver = this$AlysDisplay.players;
      var key = this$AlysDisplay.game.currentPlayer();
      var tmp$_3;
      if (Kotlin.isType((Kotlin.isType(tmp$_3 = $receiver, Map) ? tmp$_3 : throwCCE()).get_11rb$(key), Player) && this$AlysDisplay.game.state.board.isWithinBounds_dfplqh$(it)) {
        var origin = this$AlysDisplay.originPosition;
        if (origin == null) {
          tmp$ = this$AlysDisplay.game.state.board.get_dfplqh$(it);
          if (tmp$ == null) {
            return;
          }
          var selectedField = tmp$;
          if (selectedField.player !== this$AlysDisplay.game.state.currentPlayer)
            return;
          if (equals((tmp$_0 = selectedField.piece) != null ? tmp$_0.type : null, AlysType$Soldier_getInstance())) {
            this$AlysDisplay.originPosition = it;
            this$AlysDisplay.updateDisplay_pdl1vj$(this$AlysDisplay.game.winner);
            return;
          }
          var selectedArea = AlysState$Companion_getInstance().connectedPositions_jwhin5$(it, this$AlysDisplay.game.state.board);
          var tmp$_4 = this$AlysDisplay;
          var firstOrNull$result;
          firstOrNull$break: do {
            var tmp$_5;
            tmp$_5 = selectedArea.iterator();
            while (tmp$_5.hasNext()) {
              var element = tmp$_5.next();
              if (element.field.treasury != null) {
                firstOrNull$result = element;
                break firstOrNull$break;
              }
            }
            firstOrNull$result = null;
          }
           while (false);
          tmp$_4.originPosition = (tmp$_1 = firstOrNull$result) != null ? tmp$_1.position : null;
          this$AlysDisplay.updateDisplay_pdl1vj$(this$AlysDisplay.game.winner);
        }
         else {
          this$AlysDisplay.originPosition = null;
          var sourceField = this$AlysDisplay.game.state.board.get_dfplqh$(origin);
          var type = this$AlysDisplay.buildType;
          this$AlysDisplay.buildType = null;
          if (equals((tmp$_2 = sourceField != null ? sourceField.piece : null) != null ? tmp$_2.type : null, AlysType$Soldier_getInstance()))
            this$AlysDisplay.performAction_11re$(new AlysMoveAction(origin, it));
          else if (type != null)
            this$AlysDisplay.performAction_11re$(new AlysCreateAction(type, origin, it));
          else {
            this$AlysDisplay.updateDisplay_pdl1vj$(this$AlysDisplay.game.winner);
          }
        }
      }
      return Unit;
    };
  }
  AlysDisplay.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysDisplay',
    interfaces: [GameDisplay]
  };
  function AlysState(width, height, playerCount, board, currentPlayer, players) {
    AlysState$Companion_getInstance();
    if (width === void 0)
      width = 10;
    if (height === void 0)
      height = 10;
    if (playerCount === void 0)
      playerCount = 4;
    if (board === void 0)
      board = new Grid(width, height, AlysState_init$lambda(playerCount));
    if (currentPlayer === void 0)
      currentPlayer = 1;
    if (players === void 0)
      players = toList(new IntRange(1, playerCount));
    this.width = width;
    this.height = height;
    this.playerCount = playerCount;
    this.board_312tuy$_0 = board;
    this.currentPlayer_yz191a$_0 = currentPlayer;
    this.players_4wz3pm$_0 = players;
  }
  Object.defineProperty(AlysState.prototype, 'board', {
    get: function () {
      return this.board_312tuy$_0;
    }
  });
  Object.defineProperty(AlysState.prototype, 'currentPlayer', {
    get: function () {
      return this.currentPlayer_yz191a$_0;
    }
  });
  Object.defineProperty(AlysState.prototype, 'players', {
    get: function () {
      return this.players_4wz3pm$_0;
    }
  });
  AlysState.prototype.confirmLegality_11rc$ = function (action) {
    if (Kotlin.isType(action, AlysMoveAction))
      return this.confirmMoveLegality_0(action);
    if (Kotlin.isType(action, AlysCreateAction))
      return this.confirmCreateLegality_0(action);
    if (Kotlin.isType(action, AlysEndTurnAction))
      return Result$Companion_getInstance().success();
    return Result$Companion_getInstance().failure_ytbaoo$('Unknown action');
  };
  AlysState.prototype.confirmRules_byoodm$ = function (action, rules, info) {
    var tmp$;
    tmp$ = rules.iterator();
    while (tmp$.hasNext()) {
      var rule = tmp$.next();
      if (!rule.isLegal(action, this, info))
        return Result$Companion_getInstance().failure_ytbaoo$(rule.description);
    }
    return Result$Companion_getInstance().success();
  };
  AlysState.prototype.confirmMoveLegality_0 = function (action, previousInfo) {
    if (previousInfo === void 0)
      previousInfo = null;
    var info = previousInfo != null ? previousInfo : new AlysActionInfo();
    if (previousInfo == null) {
      var $this = this.confirmRules_byoodm$(action, Alys$Companion_getInstance().commonRules, info);
      if (Kotlin.isType($this, Failure)) {
        return $this;
      }
       else
        Kotlin.isType($this, Success) || throwCCE();
    }
    return this.confirmRules_byoodm$(action, Alys$Companion_getInstance().moveRules, info);
  };
  AlysState.prototype.confirmCreateLegality_0 = function (action) {
    var info = new AlysActionInfo();
    var $this = this.confirmRules_byoodm$(action, Alys$Companion_getInstance().commonRules, info);
    if (Kotlin.isType($this, Failure)) {
      return $this;
    }
     else
      Kotlin.isType($this, Success) || throwCCE();
    var $this_0 = this.confirmRules_byoodm$(action, Alys$Companion_getInstance().createRules, info);
    if (Kotlin.isType($this_0, Failure)) {
      return $this_0;
    }
     else
      Kotlin.isType($this_0, Success) || throwCCE();
    if (action.type === AlysType$Soldier_getInstance()) {
      info.originPiece = new AlysPiece(AlysType$Soldier_getInstance());
      return this.confirmMoveLegality_0(new AlysMoveAction(action.origin, action.destination), info);
    }
    return Result$Companion_getInstance().success();
  };
  var Math_0 = Math;
  AlysState.prototype.defenseOf_i615cl$ = function (field) {
    var tmp$, tmp$_0;
    if (equals((tmp$ = field.piece) != null ? tmp$.type : null, AlysType$Soldier_getInstance())) {
      var a = field.piece.strength;
      return Math_0.min(a, 3);
    }
    if (equals((tmp$_0 = field.piece) != null ? tmp$_0.type : null, AlysType$Fort_getInstance()))
      return 2;
    if (field.treasury != null)
      return 1;
    return 0;
  };
  AlysState.prototype.possibleActions = function () {
    var actions = ArrayList_init();
    return toList(actions);
  };
  AlysState.prototype.nextState_11rc$ = function (action) {
    var newBoard = this.board.copy_urw29u$();
    if (Kotlin.isType(action, AlysMoveAction))
      return this.nextStateFrom_0(action, newBoard);
    if (Kotlin.isType(action, AlysCreateAction))
      return this.nextStateFrom_1(action, newBoard);
    if (Kotlin.isType(action, AlysEndTurnAction))
      return this.nextStateFrom_2(action, newBoard);
    return this.copy_gb7y5t$(void 0, void 0, void 0, newBoard);
  };
  AlysState.prototype.nextStateFrom_0 = function (action, newBoard) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    tmp$_0 = (tmp$ = newBoard.get_dfplqh$(action.origin)) != null ? tmp$.piece : null;
    if (tmp$_0 == null) {
      return this;
    }
    var piece = tmp$_0;
    tmp$_1 = newBoard.get_dfplqh$(action.destination);
    if (tmp$_1 == null) {
      return this;
    }
    var destination = tmp$_1;
    var newState = this.copy_gb7y5t$(void 0, void 0, void 0, newBoard);
    if (destination.player !== this.currentPlayer)
      this.invadeField_0(action.origin, action.destination, newState);
    else {
      var tmp$_3;
      if (equals((tmp$_3 = destination.piece) != null ? tmp$_3.type : null, AlysType$Soldier_getInstance())) {
        var tmp$_4 = action.destination;
        var tmp$_5 = void 0;
        var tmp$_6 = destination.piece;
        var tmp$_7 = void 0;
        var b = destination.piece.strength + piece.strength | 0;
        newBoard.set_39d550$(tmp$_4, destination.copy_jcygvj$(tmp$_5, tmp$_6.copy_thel6g$(tmp$_7, Math_0.min(4, b))));
      }
       else {
        var tmp$_8;
        if (((tmp$_8 = destination.piece) != null ? tmp$_8.type : null) != null)
          newBoard.set_39d550$(action.destination, new AlysField(this.currentPlayer, piece.copy_thel6g$(void 0, void 0, true)));
        else
          newBoard.set_39d550$(action.destination, new AlysField(this.currentPlayer, piece.copy_thel6g$()));
      }
    }
    newBoard.set_39d550$(action.origin, (Kotlin.isType(tmp$_2 = newBoard.get_dfplqh$(action.origin), AlysField) ? tmp$_2 : throwCCE()).copy_jcygvj$(void 0, null));
    return newState;
  };
  AlysState.prototype.invadeField_0 = function (origin, destination, newState) {
    var tmp$, tmp$_0;
    var piece = Kotlin.isType(tmp$_0 = (tmp$ = newState.board.get_dfplqh$(origin)) != null ? tmp$.piece : null, AlysPiece) ? tmp$_0 : throwCCE();
    newState.board.set_39d550$(destination, new AlysField(this.currentPlayer, piece.copy_thel6g$(void 0, void 0, true)));
    this.mergeAreas_0(destination, newState);
    this.fixSplitAreas_0(destination, newState);
  };
  AlysState.prototype.mergeAreas_0 = function (mergePoint, newState) {
    var tmp$, tmp$_0;
    var area = AlysState$Companion_getInstance().connectedPositions_jwhin5$(mergePoint, newState.board);
    var destination = ArrayList_init();
    var tmp$_1;
    tmp$_1 = area.iterator();
    while (tmp$_1.hasNext()) {
      var element = tmp$_1.next();
      if (element.field.treasury != null)
        destination.add_11rb$(element);
    }
    var bases = destination;
    var tmp$_2;
    var sum = 0;
    tmp$_2 = bases.iterator();
    while (tmp$_2.hasNext()) {
      var element_0 = tmp$_2.next();
      var tmp$_3;
      sum = sum + ((tmp$_3 = element_0.field.treasury) != null ? tmp$_3 : 0) | 0;
    }
    var treasury = sum;
    var maxBy$result;
    maxBy$break: do {
      var iterator = bases.iterator();
      if (!iterator.hasNext()) {
        maxBy$result = null;
        break maxBy$break;
      }
      var maxElem = iterator.next();
      var tmp$_4;
      var maxValue = (tmp$_4 = maxElem.field.treasury) != null ? tmp$_4 : 0;
      while (iterator.hasNext()) {
        var e = iterator.next();
        var tmp$_5;
        var v = (tmp$_5 = e.field.treasury) != null ? tmp$_5 : 0;
        if (Kotlin.compareTo(maxValue, v) < 0) {
          maxElem = e;
          maxValue = v;
        }
      }
      maxBy$result = maxElem;
    }
     while (false);
    tmp$ = maxBy$result;
    if (tmp$ == null) {
      return;
    }
    var biggestBase = tmp$;
    tmp$_0 = bases.iterator();
    while (tmp$_0.hasNext()) {
      var base = tmp$_0.next();
      newState.board.set_39d550$(base.position, base.field.copy_jcygvj$(void 0, void 0, null));
    }
    newState.board.set_39d550$(biggestBase.position, biggestBase.field.copy_jcygvj$(void 0, void 0, treasury));
  };
  AlysState.prototype.fixSplitAreas_0 = function (mergePoint, newState) {
    var tmp$;
    tmp$ = mergePoint.adjacentHexes().iterator();
    loop_label: while (tmp$.hasNext()) {
      var position = tmp$.next();
      if (!newState.board.isWithinBounds_dfplqh$(position) || newState.board.get_dfplqh$(position) == null)
        continue loop_label;
      var area = AlysState$Companion_getInstance().connectedPositions_jwhin5$(position, newState.board);
      if (area.size === 1) {
        newState.board.set_39d550$(area.get_za3lpa$(0).position, area.get_za3lpa$(0).field.copy_jcygvj$(void 0, void 0, null));
        continue loop_label;
      }
      var any$result;
      any$break: do {
        var tmp$_0;
        if (Kotlin.isType(area, Collection) && area.isEmpty()) {
          any$result = false;
          break any$break;
        }
        tmp$_0 = area.iterator();
        while (tmp$_0.hasNext()) {
          var element = tmp$_0.next();
          if (element.field.treasury != null) {
            any$result = true;
            break any$break;
          }
        }
        any$result = false;
      }
       while (false);
      if (any$result)
        continue loop_label;
      var destination = ArrayList_init();
      var tmp$_1;
      tmp$_1 = area.iterator();
      while (tmp$_1.hasNext()) {
        var element_0 = tmp$_1.next();
        var tmp$_2, tmp$_3;
        if (!equals((tmp$_2 = element_0.field.piece) != null ? tmp$_2.type : null, AlysType$Soldier_getInstance()) && !equals((tmp$_3 = element_0.field.piece) != null ? tmp$_3.type : null, AlysType$Fort_getInstance()))
          destination.add_11rb$(element_0);
      }
      var emptyArea = destination;
      var newBase = emptyArea.isEmpty() ? random(area, Random_0.Default) : random(emptyArea, Random_0.Default);
      newState.board.set_39d550$(newBase.position, new AlysField(newBase.field.player, void 0, 0));
    }
  };
  AlysState.prototype.nextStateFrom_1 = function (action, newBoard) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    tmp$ = newBoard.get_dfplqh$(action.origin);
    if (tmp$ == null) {
      return this;
    }
    var origin = tmp$;
    if (action.type === AlysType$Soldier_getInstance()) {
      tmp$_2 = action.origin;
      tmp$_1 = (typeof (tmp$_0 = origin.treasury) === 'number' ? tmp$_0 : throwCCE()) - 10 | 0;
      newBoard.set_39d550$(tmp$_2, origin.copy_jcygvj$(void 0, new AlysPiece(AlysType$Soldier_getInstance()), tmp$_1));
      return this.nextStateFrom_0(new AlysMoveAction(action.origin, action.destination), newBoard);
    }
     else if (action.type === AlysType$Fort_getInstance()) {
      newBoard.set_39d550$(action.origin, origin.copy_jcygvj$(void 0, void 0, (typeof (tmp$_3 = origin.treasury) === 'number' ? tmp$_3 : throwCCE()) - 15 | 0));
      newBoard.set_39d550$(action.destination, (Kotlin.isType(tmp$_4 = newBoard.get_dfplqh$(action.destination), AlysField) ? tmp$_4 : throwCCE()).copy_jcygvj$(void 0, new AlysPiece(AlysType$Fort_getInstance())));
      return this.copy_gb7y5t$(void 0, void 0, void 0, newBoard);
    }
    return this;
  };
  AlysState.prototype.nextStateFrom_2 = function (action, newBoard) {
    var tmp$, tmp$_0, tmp$_1;
    var $receiver = newBoard.positions();
    var destination = ArrayList_init();
    var tmp$_2;
    tmp$_2 = $receiver.iterator();
    while (tmp$_2.hasNext()) {
      var element = tmp$_2.next();
      var tmp$_3, tmp$_4;
      if (((tmp$_3 = newBoard.get_dfplqh$(element)) != null ? tmp$_3.player : null) === this.currentPlayer && ((tmp$_4 = newBoard.get_dfplqh$(element)) != null ? tmp$_4.treasury : null) != null)
        destination.add_11rb$(element);
    }
    var basePositions = destination;
    tmp$ = basePositions.iterator();
    while (tmp$.hasNext()) {
      var position = tmp$.next();
      var base = Kotlin.isType(tmp$_0 = newBoard.get_dfplqh$(position), AlysField) ? tmp$_0 : throwCCE();
      var treasury = (typeof (tmp$_1 = base.treasury) === 'number' ? tmp$_1 : throwCCE()) + AlysState$Companion_getInstance().connectedPositions_jwhin5$(position, this.board).size | 0;
      newBoard.set_39d550$(position, base.copy_jcygvj$(void 0, void 0, treasury));
    }
    var nextPlayer = this.currentPlayer + 1 | 0;
    if (nextPlayer > this.playerCount) {
      nextPlayer = 1;
    }
    this.beginTurn_0(nextPlayer, newBoard);
    return this.copy_gb7y5t$(void 0, void 0, void 0, newBoard, nextPlayer);
  };
  AlysState.prototype.beginTurn_0 = function (player, newBoard) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6, tmp$_7;
    var $receiver = newBoard.positionedFields();
    var destination = ArrayList_init();
    var tmp$_8;
    tmp$_8 = $receiver.iterator();
    while (tmp$_8.hasNext()) {
      var element = tmp$_8.next();
      var tmp$_9;
      if (((tmp$_9 = element.field) != null ? tmp$_9.player : null) === player)
        destination.add_11rb$(element);
    }
    var destination_0 = ArrayList_init_0(collectionSizeOrDefault(destination, 10));
    var tmp$_10;
    tmp$_10 = destination.iterator();
    while (tmp$_10.hasNext()) {
      var item = tmp$_10.next();
      var tmp$_11;
      destination_0.add_11rb$(new PositionedField(item.position, Kotlin.isType(tmp$_11 = item.field, AlysField) ? tmp$_11 : throwCCE()));
    }
    var playerArea = destination_0;
    var newTrees = ArrayList_init();
    tmp$ = playerArea.iterator();
    while (tmp$.hasNext()) {
      var place = tmp$.next();
      if (place.field.piece == null && place.field.treasury == null) {
        var $receiver_0 = place.position.adjacentHexes();
        var destination_1 = ArrayList_init_0(collectionSizeOrDefault($receiver_0, 10));
        var tmp$_12;
        tmp$_12 = $receiver_0.iterator();
        while (tmp$_12.hasNext()) {
          var item_0 = tmp$_12.next();
          destination_1.add_11rb$(newBoard.isWithinBounds_dfplqh$(item_0) ? newBoard.get_dfplqh$(item_0) : null);
        }
        var destination_2 = ArrayList_init();
        var tmp$_13;
        tmp$_13 = destination_1.iterator();
        while (tmp$_13.hasNext()) {
          var element_0 = tmp$_13.next();
          var tmp$_14;
          if (equals((tmp$_14 = element_0 != null ? element_0.piece : null) != null ? tmp$_14.type : null, AlysType$Tree_getInstance()))
            destination_2.add_11rb$(element_0);
        }
        if (destination_2.size > 1)
          newTrees.add_11rb$(place.position);
      }
    }
    tmp$_0 = newTrees.iterator();
    while (tmp$_0.hasNext()) {
      var position = tmp$_0.next();
      newBoard.set_39d550$(position, new AlysField(player, new AlysPiece(AlysType$Tree_getInstance())));
    }
    var destination_3 = ArrayList_init();
    var tmp$_15;
    tmp$_15 = playerArea.iterator();
    while (tmp$_15.hasNext()) {
      var element_1 = tmp$_15.next();
      var tmp$_16;
      if (equals((tmp$_16 = element_1.field.piece) != null ? tmp$_16.type : null, AlysType$Grave_getInstance()))
        destination_3.add_11rb$(element_1);
    }
    tmp$_1 = destination_3.iterator();
    while (tmp$_1.hasNext()) {
      var place_0 = tmp$_1.next();
      newBoard.set_39d550$(place_0.position, new AlysField(player, new AlysPiece(AlysType$Tree_getInstance())));
    }
    var destination_4 = ArrayList_init();
    var tmp$_17;
    tmp$_17 = playerArea.iterator();
    while (tmp$_17.hasNext()) {
      var element_2 = tmp$_17.next();
      var tmp$_18;
      var tmp$_19 = equals((tmp$_18 = element_2.field.piece) != null ? tmp$_18.type : null, AlysType$Soldier_getInstance());
      if (tmp$_19) {
        var $receiver_1 = element_2.position.adjacentHexes();
        var destination_5 = ArrayList_init();
        var tmp$_20;
        tmp$_20 = $receiver_1.iterator();
        while (tmp$_20.hasNext()) {
          var element_3 = tmp$_20.next();
          var tmp$_21;
          if (newBoard.isWithinBounds_dfplqh$(element_3) && ((tmp$_21 = newBoard.get_dfplqh$(element_3)) != null ? tmp$_21.player : null) === player)
            destination_5.add_11rb$(element_3);
        }
        tmp$_19 = destination_5.isEmpty();
      }
      if (tmp$_19)
        destination_4.add_11rb$(element_2);
    }
    tmp$_2 = destination_4.iterator();
    while (tmp$_2.hasNext()) {
      var place_1 = tmp$_2.next();
      newBoard.set_39d550$(place_1.position, new AlysField(player, new AlysPiece(AlysType$Grave_getInstance())));
    }
    var destination_6 = ArrayList_init();
    var tmp$_22;
    tmp$_22 = playerArea.iterator();
    while (tmp$_22.hasNext()) {
      var element_4 = tmp$_22.next();
      if (element_4.field.player === player && element_4.field.treasury != null)
        destination_6.add_11rb$(element_4);
    }
    var bases = destination_6;
    tmp$_3 = bases.iterator();
    while (tmp$_3.hasNext()) {
      var base = tmp$_3.next();
      var area = AlysState$Companion_getInstance().connectedPositions_jwhin5$(base.position, this.board);
      var treasury = typeof (tmp$_4 = base.field.treasury) === 'number' ? tmp$_4 : throwCCE();
      var destination_7 = ArrayList_init();
      var tmp$_23;
      tmp$_23 = area.iterator();
      while (tmp$_23.hasNext()) {
        var element_5 = tmp$_23.next();
        var tmp$_24, tmp$_25;
        if (!equals((tmp$_24 = element_5.field.piece) != null ? tmp$_24.type : null, AlysType$Tree_getInstance()) && !equals((tmp$_25 = element_5.field.piece) != null ? tmp$_25.type : null, AlysType$CoastTree_getInstance()))
          destination_7.add_11rb$(element_5);
      }
      +destination_7.size;
      var destination_8 = ArrayList_init();
      var tmp$_26;
      tmp$_26 = area.iterator();
      while (tmp$_26.hasNext()) {
        var element_6 = tmp$_26.next();
        var tmp$_27;
        if (equals((tmp$_27 = element_6.field.piece) != null ? tmp$_27.type : null, AlysType$Soldier_getInstance()))
          destination_8.add_11rb$(element_6);
      }
      var soldiers = destination_8;
      tmp$_5 = soldiers.iterator();
      while (tmp$_5.hasNext()) {
        var soldier = tmp$_5.next();
        newBoard.set_39d550$(soldier.position, soldier.field.copy_jcygvj$(void 0, (tmp$_6 = soldier.field.piece) != null ? tmp$_6.copy_thel6g$(void 0, void 0, false) : null));
      }
      var destination_9 = ArrayList_init_0(collectionSizeOrDefault(soldiers, 10));
      var tmp$_28;
      tmp$_28 = soldiers.iterator();
      while (tmp$_28.hasNext()) {
        var item_1 = tmp$_28.next();
        var tmp$_29, tmp$_30;
        destination_9.add_11rb$(this.upkeepFor_0((tmp$_30 = (tmp$_29 = item_1.field.piece) != null ? tmp$_29.strength : null) != null ? tmp$_30 : 0));
      }
      var upkeep = sum(destination_9);
      if (upkeep <= treasury)
        newBoard.set_39d550$(base.position, base.field.copy_jcygvj$(void 0, void 0, treasury - upkeep | 0));
      else {
        tmp$_7 = soldiers.iterator();
        while (tmp$_7.hasNext()) {
          var soldier_0 = tmp$_7.next();
          newBoard.set_39d550$(soldier_0.position, new AlysField(player, new AlysPiece(AlysType$Grave_getInstance())));
        }
      }
    }
  };
  AlysState.prototype.upkeepFor_0 = function (strength) {
    var tmp$;
    switch (strength) {
      case 1:
        tmp$ = 2;
        break;
      case 2:
        tmp$ = 6;
        break;
      case 3:
        tmp$ = 18;
        break;
      case 4:
        tmp$ = 54;
        break;
      default:tmp$ = 0;
        break;
    }
    return tmp$;
  };
  AlysState.prototype.findWinner = function () {
    return null;
  };
  AlysState.prototype.isConnected_vwqnnw$ = function (origin, destination) {
    var tmp$;
    var area = AlysState$Companion_getInstance().connectedPositions_jwhin5$(origin, this.board);
    tmp$ = destination.adjacentHexes().iterator();
    loop_label: while (tmp$.hasNext()) {
      var pos = tmp$.next();
      var any$result;
      any$break: do {
        var tmp$_0;
        if (Kotlin.isType(area, Collection) && area.isEmpty()) {
          any$result = false;
          break any$break;
        }
        tmp$_0 = area.iterator();
        while (tmp$_0.hasNext()) {
          var element = tmp$_0.next();
          var tmp$_1;
          if ((tmp$_1 = element.position) != null ? tmp$_1.equals(pos) : null) {
            any$result = true;
            break any$break;
          }
        }
        any$result = false;
      }
       while (false);
      if (any$result)
        return true;
    }
    return false;
  };
  function AlysState$Companion() {
    AlysState$Companion_instance = this;
  }
  var emptyList = Kotlin.kotlin.collections.emptyList_287e2$;
  AlysState$Companion.prototype.connectedPositions_jwhin5$ = function (origin, board) {
    var tmp$;
    tmp$ = board.get_dfplqh$(origin);
    if (tmp$ == null) {
      return emptyList();
    }
    var base = tmp$;
    var front = mutableListOf([origin]);
    var connected = mutableListOf([origin]);
    while (!front.isEmpty()) {
      var nextPosition = front.removeAt_za3lpa$(0);
      var $receiver = nextPosition.adjacentHexes();
      var destination = ArrayList_init();
      var tmp$_0;
      tmp$_0 = $receiver.iterator();
      while (tmp$_0.hasNext()) {
        var element = tmp$_0.next();
        var tmp$_1;
        if (board.isWithinBounds_dfplqh$(element) && ((tmp$_1 = board.get_dfplqh$(element)) != null ? tmp$_1.player : null) === base.player)
          destination.add_11rb$(element);
      }
      var destination_0 = ArrayList_init();
      var tmp$_2;
      tmp$_2 = destination.iterator();
      while (tmp$_2.hasNext()) {
        var element_0 = tmp$_2.next();
        if (!connected.contains_11rb$(element_0))
          destination_0.add_11rb$(element_0);
      }
      var newConnected = destination_0;
      connected.addAll_brywnq$(newConnected);
      front.addAll_brywnq$(newConnected);
    }
    var destination_1 = ArrayList_init_0(collectionSizeOrDefault(connected, 10));
    var tmp$_3;
    tmp$_3 = connected.iterator();
    while (tmp$_3.hasNext()) {
      var item = tmp$_3.next();
      var tmp$_4;
      destination_1.add_11rb$(new PositionedField(item, Kotlin.isType(tmp$_4 = board.get_dfplqh$(item), AlysField) ? tmp$_4 : throwCCE()));
    }
    return destination_1;
  };
  AlysState$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var AlysState$Companion_instance = null;
  function AlysState$Companion_getInstance() {
    if (AlysState$Companion_instance === null) {
      new AlysState$Companion();
    }
    return AlysState$Companion_instance;
  }
  function AlysState_init$lambda(closure$playerCount) {
    return function (x, y) {
      return new AlysField(random_0(new IntRange(1, closure$playerCount), Random_0.Default));
    };
  }
  AlysState.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'AlysState',
    interfaces: [BoardGameState]
  };
  AlysState.prototype.component1 = function () {
    return this.width;
  };
  AlysState.prototype.component2 = function () {
    return this.height;
  };
  AlysState.prototype.component3 = function () {
    return this.playerCount;
  };
  AlysState.prototype.component4 = function () {
    return this.board;
  };
  AlysState.prototype.component5 = function () {
    return this.currentPlayer;
  };
  AlysState.prototype.component6 = function () {
    return this.players;
  };
  AlysState.prototype.copy_gb7y5t$ = function (width, height, playerCount, board, currentPlayer, players) {
    return new AlysState(width === void 0 ? this.width : width, height === void 0 ? this.height : height, playerCount === void 0 ? this.playerCount : playerCount, board === void 0 ? this.board : board, currentPlayer === void 0 ? this.currentPlayer : currentPlayer, players === void 0 ? this.players : players);
  };
  AlysState.prototype.toString = function () {
    return 'AlysState(width=' + Kotlin.toString(this.width) + (', height=' + Kotlin.toString(this.height)) + (', playerCount=' + Kotlin.toString(this.playerCount)) + (', board=' + Kotlin.toString(this.board)) + (', currentPlayer=' + Kotlin.toString(this.currentPlayer)) + (', players=' + Kotlin.toString(this.players)) + ')';
  };
  AlysState.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.width) | 0;
    result = result * 31 + Kotlin.hashCode(this.height) | 0;
    result = result * 31 + Kotlin.hashCode(this.playerCount) | 0;
    result = result * 31 + Kotlin.hashCode(this.board) | 0;
    result = result * 31 + Kotlin.hashCode(this.currentPlayer) | 0;
    result = result * 31 + Kotlin.hashCode(this.players) | 0;
    return result;
  };
  AlysState.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.width, other.width) && Kotlin.equals(this.height, other.height) && Kotlin.equals(this.playerCount, other.playerCount) && Kotlin.equals(this.board, other.board) && Kotlin.equals(this.currentPlayer, other.currentPlayer) && Kotlin.equals(this.players, other.players)))));
  };
  function BoardGame() {
    this.players = LinkedHashMap_init();
    this.winner = null;
  }
  BoardGame.prototype.performAction_11rd$ = function (action) {
    var tmp$;
    var $this = this.state.confirmLegality_11rc$(action);
    if (Kotlin.isType($this, Failure)) {
      return $this;
    }
     else
      Kotlin.isType($this, Success) || throwCCE();
    this.state = Kotlin.isType(tmp$ = this.state.nextState_11rc$(action), BoardGameState) ? tmp$ : throwCCE();
    var $receiver = this.players;
    var key = this.state.findWinner();
    var tmp$_0;
    this.winner = (Kotlin.isType(tmp$_0 = $receiver, Map) ? tmp$_0 : throwCCE()).get_11rb$(key);
    return Result$Companion_getInstance().success();
  };
  BoardGame.prototype.currentPlayer = function () {
    return this.players.get_11rb$(this.state.currentPlayer);
  };
  BoardGame.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'BoardGame',
    interfaces: []
  };
  function BoardGameState() {
  }
  BoardGameState.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'BoardGameState',
    interfaces: []
  };
  function Result() {
    Result$Companion_getInstance();
  }
  function Result$Companion() {
    Result$Companion_instance = this;
  }
  Result$Companion.prototype.success = function () {
    return new Success(null);
  };
  Result$Companion.prototype.failure_ytbaoo$ = function (error) {
    return new Failure(error);
  };
  Result$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Result$Companion_instance = null;
  function Result$Companion_getInstance() {
    if (Result$Companion_instance === null) {
      new Result$Companion();
    }
    return Result$Companion_instance;
  }
  Result.prototype.onFailure_g6hfr8$ = defineInlineFunction('Tern.Result.onFailure_g6hfr8$', wrapFunction(function () {
    var Failure = _.Failure;
    var Success = _.Success;
    var throwCCE = Kotlin.throwCCE;
    return function (callback) {
      var tmp$;
      return Kotlin.isType(this, Failure) ? callback(this) : (Kotlin.isType(tmp$ = this, Success) ? tmp$ : throwCCE()).value;
    };
  }));
  Result.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Result',
    interfaces: []
  };
  function Success(value) {
    Result.call(this);
    this.value = value;
  }
  Success.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Success',
    interfaces: [Result]
  };
  function Failure(error) {
    Result.call(this);
    this.error = error;
  }
  Failure.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Failure',
    interfaces: [Result]
  };
  function Rule(description, isLegal) {
    this.description = description;
    this.isLegal = isLegal;
  }
  Rule.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Rule',
    interfaces: []
  };
  function Chess(state) {
    if (state === void 0)
      state = new ChessState();
    BoardGame.call(this);
    this.state_vr5uhj$_0 = state;
  }
  Object.defineProperty(Chess.prototype, 'state', {
    get: function () {
      return this.state_vr5uhj$_0;
    },
    set: function (state) {
      this.state_vr5uhj$_0 = state;
    }
  });
  Chess.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Chess',
    interfaces: [BoardGame]
  };
  function ChessState(board, currentPlayer, players) {
    if (board === void 0)
      board = new Grid(8, 8, ChessState_init$lambda);
    if (currentPlayer === void 0)
      currentPlayer = ChessPlayer$White_getInstance();
    if (players === void 0)
      players = listOf([ChessPlayer$White_getInstance(), ChessPlayer$Black_getInstance()]);
    this.board_mlguen$_0 = board;
    this.currentPlayer_mainy5$_0 = currentPlayer;
    this.players_otp1fp$_0 = players;
  }
  Object.defineProperty(ChessState.prototype, 'board', {
    get: function () {
      return this.board_mlguen$_0;
    }
  });
  Object.defineProperty(ChessState.prototype, 'currentPlayer', {
    get: function () {
      return this.currentPlayer_mainy5$_0;
    }
  });
  Object.defineProperty(ChessState.prototype, 'players', {
    get: function () {
      return this.players_otp1fp$_0;
    }
  });
  ChessState.prototype.confirmLegality_11rc$ = function (action) {
    var tmp$, tmp$_0;
    tmp$ = this.board.get_dfplqh$(action.source);
    if (tmp$ == null) {
      return Result$Companion_getInstance().failure_ytbaoo$("Couldn't find piece");
    }
    var piece = tmp$;
    if (piece.player !== this.currentPlayer)
      return Result$Companion_getInstance().failure_ytbaoo$('Can only move own pieces');
    var enemy = this.board.get_dfplqh$(action.destination);
    if (equals(enemy != null ? enemy.player : null, this.currentPlayer))
      return Result$Companion_getInstance().failure_ytbaoo$('Cannot take own pieces');
    if (!piece.isLegal_w8obu5$(this.board, action))
      return Result$Companion_getInstance().failure_ytbaoo$('Piece cannot move there');
    var newState = this.nextState_11rc$(action);
    var $receiver = newState.board.fields;
    var indexOfFirst$result;
    indexOfFirst$break: do {
      var tmp$_1;
      var index = 0;
      tmp$_1 = $receiver.iterator();
      while (tmp$_1.hasNext()) {
        var item = tmp$_1.next();
        if (equals(item != null ? item.type : null, ChessPieceType$King_getInstance()) && item.player === this.currentPlayer) {
          indexOfFirst$result = index;
          break indexOfFirst$break;
        }
        index = index + 1 | 0;
      }
      indexOfFirst$result = -1;
    }
     while (false);
    var index_0 = indexOfFirst$result;
    var position = new Position(index_0 % 8, index_0 / 8 | 0);
    var king = Kotlin.isType(tmp$_0 = newState.board.get_dfplqh$(position), ChessPiece) ? tmp$_0 : throwCCE();
    return king.isInCheck_wzxs7i$(newState.board, position) ? Result$Companion_getInstance().failure_ytbaoo$('Cannot make a move that would leave the king in check') : Result$Companion_getInstance().success();
  };
  ChessState.prototype.possibleActions = function () {
    var actions = ArrayList_init();
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        var piece = this.board.get_vux9f0$(i, j);
        if (!equals(piece != null ? piece.player : null, this.currentPlayer))
          continue;
        actions.addAll_brywnq$(piece.possibleMoves_wzxs7i$(this.board, new Position(i, j)));
      }
    }
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = actions.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (Kotlin.isType(this.confirmLegality_11rc$(element), Success))
        destination.add_11rb$(element);
    }
    return destination;
  };
  ChessState.prototype.nextState_11rc$ = function (action) {
    var tmp$, tmp$_0;
    var newBoard = this.board.copy_urw29u$();
    var newPiece = Kotlin.isType(tmp$_0 = (tmp$ = this.board.get_dfplqh$(action.source)) != null ? tmp$.copy_9wx23a$(void 0, void 0, true) : null, ChessPiece) ? tmp$_0 : throwCCE();
    if (newPiece.type === ChessPieceType$Pawn_getInstance()) {
      if (action.destination.y === 0 && newPiece.player === ChessPlayer$Black_getInstance() || (action.destination.y === (this.board.height - 1 | 0) && newPiece.player === ChessPlayer$White_getInstance()))
        newPiece = newPiece.copy_9wx23a$(ChessPieceType$Queen_getInstance());
    }
    if (newPiece.type === ChessPieceType$King_getInstance() && abs(action.source.x - action.destination.x | 0) === 2) {
      this.moveCastlingRook_0(action);
    }
    newBoard.set_39d550$(action.destination, newPiece);
    newBoard.set_39d550$(action.source, null);
    return new ChessState(newBoard, this.currentPlayer === ChessPlayer$White_getInstance() ? ChessPlayer$Black_getInstance() : ChessPlayer$White_getInstance());
  };
  ChessState.prototype.findWinner = function () {
    for (var i = 0; i < 8; i++) {
      loop_label: for (var j = 0; j < 8; j++) {
        var piece = this.board.get_vux9f0$(i, j);
        if (!equals(piece != null ? piece.player : null, this.currentPlayer))
          continue loop_label;
        var $receiver = piece.possibleMoves_wzxs7i$(this.board, new Position(i, j));
        var any$result;
        any$break: do {
          var tmp$;
          if (Kotlin.isType($receiver, Collection) && $receiver.isEmpty()) {
            any$result = false;
            break any$break;
          }
          tmp$ = $receiver.iterator();
          while (tmp$.hasNext()) {
            var element = tmp$.next();
            if (Kotlin.isType(this.confirmLegality_11rc$(element), Success)) {
              any$result = true;
              break any$break;
            }
          }
          any$result = false;
        }
         while (false);
        if (any$result)
          return null;
      }
    }
    return this.currentPlayer === ChessPlayer$Black_getInstance() ? ChessPlayer$White_getInstance() : ChessPlayer$Black_getInstance();
  };
  ChessState.prototype.moveCastlingRook_0 = function (action) {
    if (action.destination.x < 4) {
      this.board.set_vq7693$(action.destination.x + 1 | 0, action.source.y, this.board.get_vux9f0$(0, action.source.y));
      this.board.set_vq7693$(0, action.source.y, null);
    }
     else {
      this.board.set_vq7693$(action.destination.x - 1 | 0, action.source.y, this.board.get_vux9f0$(this.board.width - 1 | 0, action.source.y));
      this.board.set_vq7693$(this.board.width - 1 | 0, action.source.y, null);
    }
  };
  function ChessState_init$lambda(x, y) {
    switch (y) {
      case 0:
        switch (x) {
          case 0:
            return new ChessPiece(ChessPieceType$Rook_getInstance(), ChessPlayer$White_getInstance());
          case 1:
            return new ChessPiece(ChessPieceType$Knight_getInstance(), ChessPlayer$White_getInstance());
          case 2:
            return new ChessPiece(ChessPieceType$Bishop_getInstance(), ChessPlayer$White_getInstance());
          case 3:
            return new ChessPiece(ChessPieceType$Queen_getInstance(), ChessPlayer$White_getInstance());
          case 4:
            return new ChessPiece(ChessPieceType$King_getInstance(), ChessPlayer$White_getInstance());
          case 5:
            return new ChessPiece(ChessPieceType$Bishop_getInstance(), ChessPlayer$White_getInstance());
          case 6:
            return new ChessPiece(ChessPieceType$Knight_getInstance(), ChessPlayer$White_getInstance());
          case 7:
            return new ChessPiece(ChessPieceType$Rook_getInstance(), ChessPlayer$White_getInstance());
          default:return null;
        }

      case 1:
        return new ChessPiece(ChessPieceType$Pawn_getInstance(), ChessPlayer$White_getInstance());
      case 6:
        return new ChessPiece(ChessPieceType$Pawn_getInstance(), ChessPlayer$Black_getInstance());
      case 7:
        switch (x) {
          case 0:
            return new ChessPiece(ChessPieceType$Rook_getInstance(), ChessPlayer$Black_getInstance());
          case 1:
            return new ChessPiece(ChessPieceType$Knight_getInstance(), ChessPlayer$Black_getInstance());
          case 2:
            return new ChessPiece(ChessPieceType$Bishop_getInstance(), ChessPlayer$Black_getInstance());
          case 3:
            return new ChessPiece(ChessPieceType$Queen_getInstance(), ChessPlayer$Black_getInstance());
          case 4:
            return new ChessPiece(ChessPieceType$King_getInstance(), ChessPlayer$Black_getInstance());
          case 5:
            return new ChessPiece(ChessPieceType$Bishop_getInstance(), ChessPlayer$Black_getInstance());
          case 6:
            return new ChessPiece(ChessPieceType$Knight_getInstance(), ChessPlayer$Black_getInstance());
          case 7:
            return new ChessPiece(ChessPieceType$Rook_getInstance(), ChessPlayer$Black_getInstance());
          default:return null;
        }

      default:return null;
    }
  }
  ChessState.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ChessState',
    interfaces: [BoardGameState]
  };
  ChessState.prototype.component1 = function () {
    return this.board;
  };
  ChessState.prototype.component2 = function () {
    return this.currentPlayer;
  };
  ChessState.prototype.component3 = function () {
    return this.players;
  };
  ChessState.prototype.copy_d7oxyc$ = function (board, currentPlayer, players) {
    return new ChessState(board === void 0 ? this.board : board, currentPlayer === void 0 ? this.currentPlayer : currentPlayer, players === void 0 ? this.players : players);
  };
  ChessState.prototype.toString = function () {
    return 'ChessState(board=' + Kotlin.toString(this.board) + (', currentPlayer=' + Kotlin.toString(this.currentPlayer)) + (', players=' + Kotlin.toString(this.players)) + ')';
  };
  ChessState.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.board) | 0;
    result = result * 31 + Kotlin.hashCode(this.currentPlayer) | 0;
    result = result * 31 + Kotlin.hashCode(this.players) | 0;
    return result;
  };
  ChessState.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.board, other.board) && Kotlin.equals(this.currentPlayer, other.currentPlayer) && Kotlin.equals(this.players, other.players)))));
  };
  function ChessAction(source, destination) {
    this.source = source;
    this.destination = destination;
  }
  ChessAction.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ChessAction',
    interfaces: []
  };
  ChessAction.prototype.component1 = function () {
    return this.source;
  };
  ChessAction.prototype.component2 = function () {
    return this.destination;
  };
  ChessAction.prototype.copy_vwqnnw$ = function (source, destination) {
    return new ChessAction(source === void 0 ? this.source : source, destination === void 0 ? this.destination : destination);
  };
  ChessAction.prototype.toString = function () {
    return 'ChessAction(source=' + Kotlin.toString(this.source) + (', destination=' + Kotlin.toString(this.destination)) + ')';
  };
  ChessAction.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.source) | 0;
    result = result * 31 + Kotlin.hashCode(this.destination) | 0;
    return result;
  };
  ChessAction.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.source, other.source) && Kotlin.equals(this.destination, other.destination)))));
  };
  function ChessPieceType(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function ChessPieceType_initFields() {
    ChessPieceType_initFields = function () {
    };
    ChessPieceType$King_instance = new ChessPieceType('King', 0);
    ChessPieceType$Queen_instance = new ChessPieceType('Queen', 1);
    ChessPieceType$Bishop_instance = new ChessPieceType('Bishop', 2);
    ChessPieceType$Knight_instance = new ChessPieceType('Knight', 3);
    ChessPieceType$Rook_instance = new ChessPieceType('Rook', 4);
    ChessPieceType$Pawn_instance = new ChessPieceType('Pawn', 5);
  }
  var ChessPieceType$King_instance;
  function ChessPieceType$King_getInstance() {
    ChessPieceType_initFields();
    return ChessPieceType$King_instance;
  }
  var ChessPieceType$Queen_instance;
  function ChessPieceType$Queen_getInstance() {
    ChessPieceType_initFields();
    return ChessPieceType$Queen_instance;
  }
  var ChessPieceType$Bishop_instance;
  function ChessPieceType$Bishop_getInstance() {
    ChessPieceType_initFields();
    return ChessPieceType$Bishop_instance;
  }
  var ChessPieceType$Knight_instance;
  function ChessPieceType$Knight_getInstance() {
    ChessPieceType_initFields();
    return ChessPieceType$Knight_instance;
  }
  var ChessPieceType$Rook_instance;
  function ChessPieceType$Rook_getInstance() {
    ChessPieceType_initFields();
    return ChessPieceType$Rook_instance;
  }
  var ChessPieceType$Pawn_instance;
  function ChessPieceType$Pawn_getInstance() {
    ChessPieceType_initFields();
    return ChessPieceType$Pawn_instance;
  }
  ChessPieceType.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ChessPieceType',
    interfaces: [Enum]
  };
  function ChessPieceType$values() {
    return [ChessPieceType$King_getInstance(), ChessPieceType$Queen_getInstance(), ChessPieceType$Bishop_getInstance(), ChessPieceType$Knight_getInstance(), ChessPieceType$Rook_getInstance(), ChessPieceType$Pawn_getInstance()];
  }
  ChessPieceType.values = ChessPieceType$values;
  function ChessPieceType$valueOf(name) {
    switch (name) {
      case 'King':
        return ChessPieceType$King_getInstance();
      case 'Queen':
        return ChessPieceType$Queen_getInstance();
      case 'Bishop':
        return ChessPieceType$Bishop_getInstance();
      case 'Knight':
        return ChessPieceType$Knight_getInstance();
      case 'Rook':
        return ChessPieceType$Rook_getInstance();
      case 'Pawn':
        return ChessPieceType$Pawn_getInstance();
      default:throwISE('No enum constant ChessPieceType.' + name);
    }
  }
  ChessPieceType.valueOf_61zpoe$ = ChessPieceType$valueOf;
  function ChessPlayer(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function ChessPlayer_initFields() {
    ChessPlayer_initFields = function () {
    };
    ChessPlayer$White_instance = new ChessPlayer('White', 0);
    ChessPlayer$Black_instance = new ChessPlayer('Black', 1);
  }
  var ChessPlayer$White_instance;
  function ChessPlayer$White_getInstance() {
    ChessPlayer_initFields();
    return ChessPlayer$White_instance;
  }
  var ChessPlayer$Black_instance;
  function ChessPlayer$Black_getInstance() {
    ChessPlayer_initFields();
    return ChessPlayer$Black_instance;
  }
  ChessPlayer.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ChessPlayer',
    interfaces: [Enum]
  };
  function ChessPlayer$values() {
    return [ChessPlayer$White_getInstance(), ChessPlayer$Black_getInstance()];
  }
  ChessPlayer.values = ChessPlayer$values;
  function ChessPlayer$valueOf(name) {
    switch (name) {
      case 'White':
        return ChessPlayer$White_getInstance();
      case 'Black':
        return ChessPlayer$Black_getInstance();
      default:throwISE('No enum constant ChessPlayer.' + name);
    }
  }
  ChessPlayer.valueOf_61zpoe$ = ChessPlayer$valueOf;
  function ChessDisplay(canvas, playerArea, gameArea) {
    GameDisplay.call(this, canvas, playerArea, gameArea);
    this.game_vohlt0$_0 = new Chess();
    this.sourcePosition = null;
    this.getColor_tn0utd$_0 = ChessDisplay$getColor$lambda(this);
    this.draw_vpud9y$_0 = ChessDisplay$draw$lambda;
    var $receiver = this.game.players;
    var key = ChessPlayer$White_getInstance();
    $receiver.put_xwzc9p$(key, 'White');
    var $receiver_0 = this.players;
    var value = new Player();
    $receiver_0.put_xwzc9p$('White', value);
    var $receiver_1 = this.game.players;
    var key_0 = ChessPlayer$Black_getInstance();
    $receiver_1.put_xwzc9p$(key_0, 'Black');
    var $receiver_2 = this.players;
    var value_0 = new RandomAIPlayer();
    $receiver_2.put_xwzc9p$('Black', value_0);
    this.updateDisplay_pdl1vj$(null);
    this.gridDisplay.onClick = ChessDisplay_init$lambda(this);
  }
  Object.defineProperty(ChessDisplay.prototype, 'game', {
    get: function () {
      return this.game_vohlt0$_0;
    },
    set: function (game) {
      this.game_vohlt0$_0 = game;
    }
  });
  Object.defineProperty(ChessDisplay.prototype, 'getColor', {
    get: function () {
      return this.getColor_tn0utd$_0;
    }
  });
  Object.defineProperty(ChessDisplay.prototype, 'draw', {
    get: function () {
      return this.draw_vpud9y$_0;
    }
  });
  function ChessDisplay$getColor$lambda(this$ChessDisplay) {
    return function (f, x, y) {
      var source = this$ChessDisplay.sourcePosition;
      if (source != null && source.x === x && source.y === y) {
        return 'darkgrey';
      }
      if (x % 2 === 0 ? y % 2 === 0 : y % 2 === 1)
        return 'white';
      else
        return 'grey';
    };
  }
  function ChessDisplay$draw$lambda(context, fieldSize, piece, f, f_0) {
    var tmp$;
    context.fillStyle = 'black';
    context.font = fieldSize.toString() + 'px arial';
    context.textBaseline = 'top';
    var isBlack = equals(piece != null ? piece.player : null, ChessPlayer$Black_getInstance());
    tmp$ = piece != null ? piece.type : null;
    if (equals(tmp$, ChessPieceType$King_getInstance()))
      context.fillText(isBlack ? '\u265A' : '\u2654', 0.0, 0.0);
    else if (equals(tmp$, ChessPieceType$Queen_getInstance()))
      context.fillText(isBlack ? '\u265B' : '\u2655', 0.0, 0.0);
    else if (equals(tmp$, ChessPieceType$Knight_getInstance()))
      context.fillText(isBlack ? '\u265E' : '\u2658', 0.0, 0.0);
    else if (equals(tmp$, ChessPieceType$Rook_getInstance()))
      context.fillText(isBlack ? '\u265C' : '\u2656', 0.0, 0.0);
    else if (equals(tmp$, ChessPieceType$Bishop_getInstance()))
      context.fillText(isBlack ? '\u265D' : '\u2657', 0.0, 0.0);
    else if (equals(tmp$, ChessPieceType$Pawn_getInstance()))
      context.fillText(isBlack ? '\u265F' : '\u2659', 0.0, 0.0);
    return Unit;
  }
  function ChessDisplay_init$lambda(this$ChessDisplay) {
    return function (it) {
      var $receiver = this$ChessDisplay.players;
      var key = this$ChessDisplay.game.currentPlayer();
      var tmp$;
      if (Kotlin.isType((Kotlin.isType(tmp$ = $receiver, Map) ? tmp$ : throwCCE()).get_11rb$(key), Player) && it.x >= 0 && it.y >= 0 && it.x < 8 && it.y < 8) {
        var source = this$ChessDisplay.sourcePosition;
        if (source == null) {
          this$ChessDisplay.sourcePosition = new Position(it.x, it.y);
          this$ChessDisplay.updateDisplay_pdl1vj$(this$ChessDisplay.game.winner);
        }
         else {
          this$ChessDisplay.sourcePosition = null;
          this$ChessDisplay.performAction_11re$(new ChessAction(source, new Position(it.x, it.y)));
        }
      }
      return Unit;
    };
  }
  ChessDisplay.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ChessDisplay',
    interfaces: [GameDisplay]
  };
  function ChessPiece(type, player, hasMoved) {
    if (hasMoved === void 0)
      hasMoved = false;
    this.type = type;
    this.player = player;
    this.hasMoved = hasMoved;
  }
  ChessPiece.prototype.isLegal_w8obu5$ = function (board, action) {
    var tmp$;
    switch (this.type.name) {
      case 'King':
        tmp$ = this.isKingMoveLegal_0(board, action);
        break;
      case 'Queen':
        tmp$ = this.isQueenMoveLegal_0(board, action);
        break;
      case 'Bishop':
        tmp$ = this.isBishopMoveLegal_0(board, action);
        break;
      case 'Knight':
        tmp$ = this.isKnightMoveLegal_0(board, action);
        break;
      case 'Rook':
        tmp$ = this.isRookMoveLegal_0(board, action);
        break;
      case 'Pawn':
        tmp$ = this.isPawnMoveLegal_0(board, action);
        break;
      default:tmp$ = Kotlin.noWhenBranchMatched();
        break;
    }
    return tmp$;
  };
  ChessPiece.prototype.isKingMoveLegal_0 = function (board, action) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6;
    if (abs(action.source.x - action.destination.x | 0) <= 1 && abs(action.source.y - action.destination.y | 0) <= 1)
      return true;
    if (this.hasMoved || this.isInCheck_wzxs7i$(board, action.source))
      return false;
    if (this.player === ChessPlayer$White_getInstance()) {
      if ((action.source.x - action.destination.x | 0) === 2 && action.source.y === action.destination.y) {
        var cornerPiece = board.get_vux9f0$(0, 0);
        if (cornerPiece == null || cornerPiece.player !== ChessPlayer$White_getInstance() || cornerPiece.type !== ChessPieceType$Rook_getInstance() || cornerPiece.hasMoved)
          return false;
        tmp$ = action.source.x - 1 | 0;
        tmp$_0 = action.destination.x + 1 | 0;
        for (var i = tmp$; i >= tmp$_0; i--)
          if (board.get_vux9f0$(i, 0) != null)
            return false;
        if (!this.isIntermediatePositionSafe_0(board, action.source.copy_vux9f0$(action.source.x - 1 | 0), action.source))
          return false;
        return true;
      }
       else if ((action.source.x - action.destination.x | 0) === -2 && action.source.y === action.destination.y) {
        var cornerPiece_0 = board.get_vux9f0$(board.width - 1 | 0, 0);
        if (cornerPiece_0 == null || cornerPiece_0.player !== ChessPlayer$White_getInstance() || cornerPiece_0.type !== ChessPieceType$Rook_getInstance() || cornerPiece_0.hasMoved)
          return false;
        tmp$_1 = action.source.x + 1 | 0;
        tmp$_2 = action.destination.x;
        for (var i_0 = tmp$_1; i_0 < tmp$_2; i_0++)
          if (board.get_vux9f0$(i_0, 0) != null)
            return false;
        if (!this.isIntermediatePositionSafe_0(board, action.source.copy_vux9f0$(action.source.x + 1 | 0), action.source))
          return false;
        return true;
      }
    }
     else {
      if ((action.source.x - action.destination.x | 0) === 2 && action.source.y === action.destination.y) {
        var cornerPiece_1 = board.get_vux9f0$(0, board.height - 1 | 0);
        if (cornerPiece_1 == null || cornerPiece_1.player !== ChessPlayer$Black_getInstance() || cornerPiece_1.type !== ChessPieceType$Rook_getInstance() || cornerPiece_1.hasMoved)
          return false;
        tmp$_3 = action.source.x - 1 | 0;
        tmp$_4 = action.destination.x + 1 | 0;
        for (var i_1 = tmp$_3; i_1 >= tmp$_4; i_1--)
          if (board.get_vux9f0$(i_1, board.height - 1 | 0) != null)
            return false;
        if (!this.isIntermediatePositionSafe_0(board, action.source.copy_vux9f0$(action.source.x - 1 | 0), action.source))
          return false;
        return true;
      }
       else if ((action.source.x - action.destination.x | 0) === -2 && action.source.y === action.destination.y) {
        var cornerPiece_2 = board.get_vux9f0$(board.width - 1 | 0, board.height - 1 | 0);
        if (cornerPiece_2 == null || cornerPiece_2.player !== ChessPlayer$Black_getInstance() || cornerPiece_2.type !== ChessPieceType$Rook_getInstance() || cornerPiece_2.hasMoved)
          return false;
        tmp$_5 = action.source.x + 1 | 0;
        tmp$_6 = action.destination.x;
        for (var i_2 = tmp$_5; i_2 < tmp$_6; i_2++)
          if (board.get_vux9f0$(i_2, board.height - 1 | 0) != null)
            return false;
        if (!this.isIntermediatePositionSafe_0(board, action.source.copy_vux9f0$(action.source.x + 1 | 0), action.source))
          return false;
        return true;
      }
    }
    return false;
  };
  ChessPiece.prototype.isQueenMoveLegal_0 = function (board, action) {
    if (this.isBishopMoveLegal_0(board, action) || this.isRookMoveLegal_0(board, action))
      return true;
    return false;
  };
  ChessPiece.prototype.isBishopMoveLegal_0 = function (board, action) {
    if (abs(action.source.x - action.destination.x | 0) !== abs(action.source.y - action.destination.y | 0))
      return false;
    if ((action.source.x - action.destination.x | 0) > 0 && (action.source.y - action.destination.y | 0) > 0) {
      var tilesBetween = new Position(action.source.x - 1 | 0, action.source.y - 1 | 0);
      while (!(tilesBetween != null ? tilesBetween.equals(action.destination) : null)) {
        if (board.get_dfplqh$(tilesBetween) != null)
          return false;
        tilesBetween = new Position(tilesBetween.x - 1 | 0, tilesBetween.y - 1 | 0);
      }
    }
     else if ((action.source.x - action.destination.x | 0) > 0 && (action.source.y - action.destination.y | 0) < 0) {
      var tilesBetween_0 = new Position(action.source.x - 1 | 0, action.source.y + 1 | 0);
      while (!(tilesBetween_0 != null ? tilesBetween_0.equals(action.destination) : null)) {
        if (board.get_dfplqh$(tilesBetween_0) != null)
          return false;
        tilesBetween_0 = new Position(tilesBetween_0.x - 1 | 0, tilesBetween_0.y + 1 | 0);
      }
    }
     else if ((action.source.x - action.destination.x | 0) < 0 && (action.source.y - action.destination.y | 0) < 0) {
      var tilesBetween_1 = new Position(action.source.x + 1 | 0, action.source.y + 1 | 0);
      while (!(tilesBetween_1 != null ? tilesBetween_1.equals(action.destination) : null)) {
        if (board.get_dfplqh$(tilesBetween_1) != null)
          return false;
        tilesBetween_1 = new Position(tilesBetween_1.x + 1 | 0, tilesBetween_1.y + 1 | 0);
      }
    }
     else if ((action.source.x - action.destination.x | 0) < 0 && (action.source.y - action.destination.y | 0) > 0) {
      var tilesBetween_2 = new Position(action.source.x + 1 | 0, action.source.y - 1 | 0);
      while (!(tilesBetween_2 != null ? tilesBetween_2.equals(action.destination) : null)) {
        if (board.get_dfplqh$(tilesBetween_2) != null)
          return false;
        tilesBetween_2 = new Position(tilesBetween_2.x + 1 | 0, tilesBetween_2.y - 1 | 0);
      }
    }
    return true;
  };
  ChessPiece.prototype.isKnightMoveLegal_0 = function (board, action) {
    if (abs(action.source.x - action.destination.x | 0) === 2 && abs(action.source.y - action.destination.y | 0) === 1 || (abs(action.source.x - action.destination.x | 0) === 1 && abs(action.source.y - action.destination.y | 0) === 2))
      return true;
    return false;
  };
  ChessPiece.prototype.isRookMoveLegal_0 = function (board, action) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6;
    if (!(action.source.x === action.destination.x || action.source.y === action.destination.y))
      return false;
    if ((action.source.x - action.destination.x | 0) < 0) {
      tmp$ = action.source.x + 1 | 0;
      tmp$_0 = action.destination.x;
      for (var i = tmp$; i < tmp$_0; i++)
        if (board.get_vux9f0$(i, action.source.y) != null)
          return false;
    }
     else if ((action.source.x - action.destination.x | 0) > 0) {
      tmp$_1 = action.source.x - 1 | 0;
      tmp$_2 = action.destination.x + 1 | 0;
      for (var i_0 = tmp$_1; i_0 >= tmp$_2; i_0--)
        if (board.get_vux9f0$(i_0, action.source.y) != null)
          return false;
    }
     else if ((action.source.y - action.destination.y | 0) < 0) {
      tmp$_3 = action.source.y + 1 | 0;
      tmp$_4 = action.destination.y;
      for (var i_1 = tmp$_3; i_1 < tmp$_4; i_1++)
        if (board.get_vux9f0$(action.source.x, i_1) != null)
          return false;
    }
     else if ((action.source.y - action.destination.y | 0) > 0) {
      tmp$_5 = action.source.y - 1 | 0;
      tmp$_6 = action.destination.y + 1 | 0;
      for (var i_2 = tmp$_5; i_2 >= tmp$_6; i_2--)
        if (board.get_vux9f0$(action.source.x, i_2) != null)
          return false;
    }
    return true;
  };
  ChessPiece.prototype.isPawnMoveLegal_0 = function (board, action) {
    var stepDirection = this.player === ChessPlayer$White_getInstance() ? 1 : -1;
    if (action.source.x === action.destination.x && (action.source.y + stepDirection | 0) === action.destination.y)
      if (board.get_dfplqh$(action.destination) == null)
        return true;
    if (abs(action.source.x - action.destination.x | 0) === 1 && (action.source.y + stepDirection | 0) === action.destination.y)
      if (board.get_dfplqh$(action.destination) != null)
        return true;
    if (!this.hasMoved) {
      if (action.source.x === action.destination.x && (action.source.y + (2 * stepDirection | 0) | 0) === action.destination.y) {
        var tileBetween = new Position(action.source.x, action.source.y + stepDirection | 0);
        if (board.get_dfplqh$(action.destination) == null && board.get_dfplqh$(tileBetween) == null)
          return true;
      }
    }
    return false;
  };
  ChessPiece.prototype.isIntermediatePositionSafe_0 = function (board, intermediatePosition, originalPosition) {
    board.set_39d550$(intermediatePosition, this);
    board.set_39d550$(originalPosition, null);
    if (this.isInCheck_wzxs7i$(board, intermediatePosition)) {
      board.set_39d550$(intermediatePosition, null);
      board.set_39d550$(originalPosition, this);
      return false;
    }
    board.set_39d550$(intermediatePosition, null);
    board.set_39d550$(originalPosition, this);
    return true;
  };
  ChessPiece.prototype.isInCheck_wzxs7i$ = function (board, position) {
    var tmp$, tmp$_0, tmp$_1;
    tmp$ = board.height;
    for (var i = 0; i < tmp$; i++) {
      tmp$_0 = board.width;
      for (var j = 0; j < tmp$_0; j++) {
        tmp$_1 = board.get_vux9f0$(i, j);
        if (tmp$_1 == null) {
          continue;
        }
        var piece = tmp$_1;
        if (piece.player !== this.player && piece.type !== ChessPieceType$King_getInstance())
          if (piece.isLegal_w8obu5$(board, new ChessAction(new Position(i, j), position)))
            return true;
      }
    }
    return false;
  };
  ChessPiece.prototype.possibleMoves_wzxs7i$ = function (board, position) {
    var tmp$;
    switch (this.type.name) {
      case 'King':
        tmp$ = this.possibleKingMoves_0(board, position);
        break;
      case 'Queen':
        tmp$ = this.possibleQueenMoves_0(board, position);
        break;
      case 'Bishop':
        tmp$ = this.possibleBishopMoves_0(board, position);
        break;
      case 'Knight':
        tmp$ = this.possibleKnightMoves_0(board, position);
        break;
      case 'Rook':
        tmp$ = this.possibleRookMoves_0(board, position);
        break;
      case 'Pawn':
        tmp$ = this.possiblePawnMoves_0(board, position);
        break;
      default:tmp$ = Kotlin.noWhenBranchMatched();
        break;
    }
    return tmp$;
  };
  ChessPiece.prototype.possibleKingMoves_0 = function (board, position) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    var actions = ArrayList_init();
    var b = position.x - 1 | 0;
    tmp$ = Math_0.max(0, b);
    var b_0 = position.x + 1 | 0;
    tmp$_0 = Math_0.min(7, b_0);
    for (var i = tmp$; i <= tmp$_0; i++) {
      var b_1 = position.y - 1 | 0;
      tmp$_1 = Math_0.max(0, b_1);
      var b_2 = position.y + 1 | 0;
      tmp$_2 = Math_0.min(7, b_2);
      for (var j = tmp$_1; j <= tmp$_2; j++) {
        if (!equals((tmp$_3 = board.get_vux9f0$(i, j)) != null ? tmp$_3.player : null, this.player))
          actions.add_11rb$(new ChessAction(position, new Position(i, j)));
      }
    }
    return actions;
  };
  ChessPiece.prototype.possibleQueenMoves_0 = function (board, position) {
    var actions = ArrayList_init();
    actions.addAll_brywnq$(this.possibleBishopMoves_0(board, position));
    actions.addAll_brywnq$(this.possibleRookMoves_0(board, position));
    return actions;
  };
  ChessPiece.prototype.possibleBishopMoves_0 = function (board, position) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var actions = ArrayList_init();
    for (var i = 1; i <= 7; i++) {
      var pos = new Position(position.x + i | 0, position.y + i | 0);
      if (pos.x < 8 && pos.y < 8 && !equals((tmp$ = board.get_dfplqh$(pos)) != null ? tmp$.player : null, this.player))
        actions.add_11rb$(new ChessAction(position, pos));
      else
        break;
    }
    for (var i_0 = 1; i_0 <= 7; i_0++) {
      var pos_0 = new Position(position.x + i_0 | 0, position.y - i_0 | 0);
      if (pos_0.x < 8 && pos_0.y >= 0 && !equals((tmp$_0 = board.get_dfplqh$(pos_0)) != null ? tmp$_0.player : null, this.player))
        actions.add_11rb$(new ChessAction(position, pos_0));
      else
        break;
    }
    for (var i_1 = 1; i_1 <= 7; i_1++) {
      var pos_1 = new Position(position.x - i_1 | 0, position.y + i_1 | 0);
      if (pos_1.x >= 0 && pos_1.y < 8 && !equals((tmp$_1 = board.get_dfplqh$(pos_1)) != null ? tmp$_1.player : null, this.player))
        actions.add_11rb$(new ChessAction(position, pos_1));
      else
        break;
    }
    for (var i_2 = 1; i_2 <= 7; i_2++) {
      var pos_2 = new Position(position.x - i_2 | 0, position.y - i_2 | 0);
      if (pos_2.x >= 0 && pos_2.y >= 0 && !equals((tmp$_2 = board.get_dfplqh$(pos_2)) != null ? tmp$_2.player : null, this.player))
        actions.add_11rb$(new ChessAction(position, pos_2));
      else
        break;
    }
    return actions;
  };
  ChessPiece.prototype.possibleKnightMoves_0 = function (board, position) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5, tmp$_6;
    var actions = ArrayList_init();
    var destination = position.add_vux9f0$(1, 2);
    if (this.isWithinBoard_0(destination) && !equals((tmp$ = board.get_dfplqh$(destination)) != null ? tmp$.player : null, this.player))
      actions.add_11rb$(new ChessAction(position, destination));
    destination = position.add_vux9f0$(2, 1);
    if (this.isWithinBoard_0(destination) && !equals((tmp$_0 = board.get_dfplqh$(destination)) != null ? tmp$_0.player : null, this.player))
      actions.add_11rb$(new ChessAction(position, destination));
    destination = position.add_vux9f0$(1, -2);
    if (this.isWithinBoard_0(destination) && !equals((tmp$_1 = board.get_dfplqh$(destination)) != null ? tmp$_1.player : null, this.player))
      actions.add_11rb$(new ChessAction(position, destination));
    destination = position.add_vux9f0$(2, -1);
    if (this.isWithinBoard_0(destination) && !equals((tmp$_2 = board.get_dfplqh$(destination)) != null ? tmp$_2.player : null, this.player))
      actions.add_11rb$(new ChessAction(position, destination));
    destination = position.add_vux9f0$(-1, 2);
    if (this.isWithinBoard_0(destination) && !equals((tmp$_3 = board.get_dfplqh$(destination)) != null ? tmp$_3.player : null, this.player))
      actions.add_11rb$(new ChessAction(position, destination));
    destination = position.add_vux9f0$(-2, 1);
    if (this.isWithinBoard_0(destination) && !equals((tmp$_4 = board.get_dfplqh$(destination)) != null ? tmp$_4.player : null, this.player))
      actions.add_11rb$(new ChessAction(position, destination));
    destination = position.add_vux9f0$(-1, -2);
    if (this.isWithinBoard_0(destination) && !equals((tmp$_5 = board.get_dfplqh$(destination)) != null ? tmp$_5.player : null, this.player))
      actions.add_11rb$(new ChessAction(position, destination));
    destination = position.add_vux9f0$(-2, -1);
    if (this.isWithinBoard_0(destination) && !equals((tmp$_6 = board.get_dfplqh$(destination)) != null ? tmp$_6.player : null, this.player))
      actions.add_11rb$(new ChessAction(position, destination));
    return actions;
  };
  ChessPiece.prototype.possibleRookMoves_0 = function (board, position) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var actions = ArrayList_init();
    for (var i = 1; i <= 7; i++) {
      var pos = new Position(position.x + i | 0, position.y);
      if (pos.x < 8 && !equals((tmp$ = board.get_dfplqh$(pos)) != null ? tmp$.player : null, this.player))
        actions.add_11rb$(new ChessAction(position, pos));
      else
        break;
    }
    for (var i_0 = 1; i_0 <= 7; i_0++) {
      var pos_0 = new Position(position.x - i_0 | 0, position.y);
      if (pos_0.x >= 0 && !equals((tmp$_0 = board.get_dfplqh$(pos_0)) != null ? tmp$_0.player : null, this.player))
        actions.add_11rb$(new ChessAction(position, pos_0));
      else
        break;
    }
    for (var i_1 = 1; i_1 <= 7; i_1++) {
      var pos_1 = new Position(position.x, position.y + i_1 | 0);
      if (pos_1.y < 8 && !equals((tmp$_1 = board.get_dfplqh$(pos_1)) != null ? tmp$_1.player : null, this.player))
        actions.add_11rb$(new ChessAction(position, pos_1));
      else
        break;
    }
    for (var i_2 = 1; i_2 <= 7; i_2++) {
      var pos_2 = new Position(position.x, position.y - i_2 | 0);
      if (pos_2.y >= 0 && !equals((tmp$_2 = board.get_dfplqh$(pos_2)) != null ? tmp$_2.player : null, this.player))
        actions.add_11rb$(new ChessAction(position, pos_2));
      else
        break;
    }
    return actions;
  };
  ChessPiece.prototype.possiblePawnMoves_0 = function (board, position) {
    var tmp$, tmp$_0;
    var actions = ArrayList_init();
    var direction = this.player === ChessPlayer$Black_getInstance() ? -1 : 1;
    if (board.get_vux9f0$(position.x, position.y + direction | 0) == null)
      actions.add_11rb$(new ChessAction(position, new Position(position.x, position.y + direction | 0)));
    if (!this.hasMoved && board.get_vux9f0$(position.x, position.y + direction | 0) == null && board.get_vux9f0$(position.x, position.y + (direction * 2 | 0) | 0) == null)
      actions.add_11rb$(new ChessAction(position, new Position(position.x, position.y + (direction * 2 | 0) | 0)));
    if (position.x > 0 && board.get_vux9f0$(position.x - 1 | 0, position.y + direction | 0) != null && !equals((tmp$ = board.get_vux9f0$(position.x - 1 | 0, position.y + direction | 0)) != null ? tmp$.player : null, this.player))
      actions.add_11rb$(new ChessAction(position, new Position(position.x - 1 | 0, position.y + direction | 0)));
    if (position.x < 7 && board.get_vux9f0$(position.x + 1 | 0, position.y + direction | 0) != null && !equals((tmp$_0 = board.get_vux9f0$(position.x + 1 | 0, position.y + direction | 0)) != null ? tmp$_0.player : null, this.player))
      actions.add_11rb$(new ChessAction(position, new Position(position.x + 1 | 0, position.y + direction | 0)));
    return actions;
  };
  ChessPiece.prototype.isWithinBoard_0 = function (position) {
    var tmp$, tmp$_0, tmp$_1;
    tmp$ = position.x;
    if (0 <= tmp$ && tmp$ <= 7) {
      tmp$_0 = position.y;
      tmp$_1 = (0 <= tmp$_0 && tmp$_0 <= 7);
    }
     else
      tmp$_1 = false;
    return tmp$_1;
  };
  ChessPiece.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'ChessPiece',
    interfaces: []
  };
  ChessPiece.prototype.component1 = function () {
    return this.type;
  };
  ChessPiece.prototype.component2 = function () {
    return this.player;
  };
  ChessPiece.prototype.component3 = function () {
    return this.hasMoved;
  };
  ChessPiece.prototype.copy_9wx23a$ = function (type, player, hasMoved) {
    return new ChessPiece(type === void 0 ? this.type : type, player === void 0 ? this.player : player, hasMoved === void 0 ? this.hasMoved : hasMoved);
  };
  ChessPiece.prototype.toString = function () {
    return 'ChessPiece(type=' + Kotlin.toString(this.type) + (', player=' + Kotlin.toString(this.player)) + (', hasMoved=' + Kotlin.toString(this.hasMoved)) + ')';
  };
  ChessPiece.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.type) | 0;
    result = result * 31 + Kotlin.hashCode(this.player) | 0;
    result = result * 31 + Kotlin.hashCode(this.hasMoved) | 0;
    return result;
  };
  ChessPiece.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.type, other.type) && Kotlin.equals(this.player, other.player) && Kotlin.equals(this.hasMoved, other.hasMoved)))));
  };
  function GameDisplay(canvas, playerArea, gameArea) {
    this.canvas = canvas;
    this.playerArea = playerArea;
    this.gameArea = gameArea;
    this.gridDisplay = new GridDisplay(this.canvas);
    this.aiDelay = L200;
    this.players = LinkedHashMap_init();
    var tmp$, tmp$_0, tmp$_1;
    this.playerList = Kotlin.isType(tmp$ = document.createElement('div'), HTMLDivElement) ? tmp$ : throwCCE();
    this.turnLine = Kotlin.isType(tmp$_0 = document.createElement('div'), HTMLDivElement) ? tmp$_0 : throwCCE();
    this.messageLine = Kotlin.isType(tmp$_1 = document.createElement('div'), HTMLDivElement) ? tmp$_1 : throwCCE();
    this.playerArea.innerHTML = '';
    this.gameArea.innerHTML = '';
    this.turnLine.className = 'message-line';
    this.messageLine.className = 'message-line';
    this.playerArea.appendChild(this.playerList);
    this.playerArea.appendChild(this.turnLine);
    this.playerArea.appendChild(this.messageLine);
  }
  GameDisplay.prototype.performAction_11re$ = function (action) {
    var $this = this.game.performAction_11rd$(action);
    if (Kotlin.isType($this, Failure)) {
      this.messageLine.textContent = $this.error;
      this.updateDisplay_pdl1vj$(this.game.winner);
      return;
    }
     else
      Kotlin.isType($this, Success) || throwCCE();
    this.updateDisplay_pdl1vj$(this.game.winner);
    if (this.game.winner != null || this.game.state.possibleActions().isEmpty())
      return;
    var $receiver = this.players;
    var key = this.game.currentPlayer();
    var tmp$;
    this.awaitActionFrom_s8jyv4$((Kotlin.isType(tmp$ = $receiver, Map) ? tmp$ : throwCCE()).get_11rb$(key));
  };
  GameDisplay.prototype.updateDisplay_pdl1vj$ = function (winner) {
    if (winner != null)
      this.messageLine.textContent = winner + ' has won!';
    else
      this.turnLine.textContent = 'Current player: ' + this.game.currentPlayer();
    this.gridDisplay.display_31tjs9$(this.game.state.board, this.getColor, this.draw);
    this.updatePlayerList();
  };
  function GameDisplay$awaitActionFrom$lambda(this$GameDisplay_0, closure$player_0) {
    return function ($receiver, continuation_0, suspended) {
      var instance = new Coroutine$GameDisplay$awaitActionFrom$lambda(this$GameDisplay_0, closure$player_0, $receiver, this, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$GameDisplay$awaitActionFrom$lambda(this$GameDisplay_0, closure$player_0, $receiver, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
    this.local$this$GameDisplay = this$GameDisplay_0;
    this.local$closure$player = closure$player_0;
  }
  Coroutine$GameDisplay$awaitActionFrom$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$GameDisplay$awaitActionFrom$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$GameDisplay$awaitActionFrom$lambda.prototype.constructor = Coroutine$GameDisplay$awaitActionFrom$lambda;
  Coroutine$GameDisplay$awaitActionFrom$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.state_0 = 2;
            this.result_0 = delay(this.local$this$GameDisplay.aiDelay, this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            return this.local$this$GameDisplay.performAction_11re$(this.local$closure$player.requestAction_11rb$(this.local$this$GameDisplay.game.state)), Unit;
          default:this.state_0 = 1;
            throw new Error('State Machine Unreachable execution');
        }
      }
       catch (e) {
        if (this.state_0 === 1) {
          this.exceptionState_0 = this.state_0;
          throw e;
        }
         else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  GameDisplay.prototype.awaitActionFrom_s8jyv4$ = function (player) {
    var tmp$;
    if (Kotlin.isType(player, AIPlayer)) {
      Kotlin.isType(tmp$ = player, AIPlayer) ? tmp$ : throwCCE();
      launch(coroutines.GlobalScope, void 0, void 0, GameDisplay$awaitActionFrom$lambda(this, player));
    }
  };
  GameDisplay.prototype.end = function () {
    this.gridDisplay.end();
  };
  GameDisplay.prototype.updatePlayerList = function () {
    var tmp$, tmp$_0;
    this.playerList.innerHTML = '';
    tmp$ = this.players.keys.iterator();
    while (tmp$.hasNext()) {
      var player = tmp$.next();
      var playerElement = Kotlin.isType(tmp$_0 = document.createElement('div'), HTMLDivElement) ? tmp$_0 : throwCCE();
      playerElement.className = 'player';
      playerElement.textContent = player;
      this.playerList.appendChild(playerElement);
    }
  };
  GameDisplay.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GameDisplay',
    interfaces: []
  };
  function Player() {
  }
  Player.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Player',
    interfaces: []
  };
  function AIPlayer() {
  }
  AIPlayer.$metadata$ = {
    kind: Kind_INTERFACE,
    simpleName: 'AIPlayer',
    interfaces: []
  };
  function RandomAIPlayer() {
  }
  RandomAIPlayer.prototype.requestAction_11rb$ = function (state) {
    var actions = state.possibleActions();
    return actions.get_za3lpa$(random_0(until(0, actions.size), Random_0.Default));
  };
  RandomAIPlayer.prototype.endGame_iuyhfk$ = function (state, won) {
  };
  RandomAIPlayer.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'RandomAIPlayer',
    interfaces: [AIPlayer]
  };
  function Grid(width, height, init, fields) {
    if (fields === void 0) {
      var size = Kotlin.imul(width, height);
      var list = ArrayList_init_0(size);
      for (var index = 0; index < size; index++) {
        list.add_11rb$(init(index % width, index / width | 0));
      }
      fields = list;
    }
    this.width = width;
    this.height = height;
    this.init = init;
    this.fields = fields;
  }
  Grid.prototype.get_vux9f0$ = function (x, y) {
    return this.fields.get_za3lpa$(x + Kotlin.imul(this.width, y) | 0);
  };
  Grid.prototype.get_dfplqh$ = function (position) {
    return this.fields.get_za3lpa$(position.x + Kotlin.imul(this.width, position.y) | 0);
  };
  Grid.prototype.set_vq7693$ = function (x, y, value) {
    this.fields.set_wxm5ur$(x + Kotlin.imul(this.width, y) | 0, value);
  };
  Grid.prototype.set_39d550$ = function (position, value) {
    this.fields.set_wxm5ur$(position.x + Kotlin.imul(this.width, position.y) | 0, value);
  };
  Grid.prototype.copy_urw29u$ = function (width, height, init, fields) {
    if (width === void 0)
      width = this.width;
    if (height === void 0)
      height = this.height;
    if (init === void 0)
      init = this.init;
    if (fields === void 0)
      fields = toMutableList(this.fields);
    return new Grid(width, height, init, fields);
  };
  Grid.prototype.isWithinBounds_dfplqh$ = function (position) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3;
    tmp$ = this.width;
    tmp$_0 = position.x;
    if (0 <= tmp$_0 && tmp$_0 < tmp$) {
      tmp$_1 = this.height;
      tmp$_2 = position.y;
      tmp$_3 = (0 <= tmp$_2 && tmp$_2 < tmp$_1);
    }
     else
      tmp$_3 = false;
    return tmp$_3;
  };
  Grid.prototype.positions = function () {
    var size = this.fields.size;
    var list = ArrayList_init_0(size);
    for (var index = 0; index < size; index++) {
      list.add_11rb$(new Position(index % this.width, index / this.width | 0));
    }
    return list;
  };
  Grid.prototype.positionedFields = function () {
    var size = this.fields.size;
    var list = ArrayList_init_0(size);
    for (var index = 0; index < size; index++) {
      list.add_11rb$(new PositionedField(new Position(index % this.width, index / this.width | 0), this.fields.get_za3lpa$(index)));
    }
    return list;
  };
  Grid.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Grid',
    interfaces: []
  };
  function PositionedField(position, field) {
    this.position = position;
    this.field = field;
  }
  PositionedField.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'PositionedField',
    interfaces: []
  };
  PositionedField.prototype.component1 = function () {
    return this.position;
  };
  PositionedField.prototype.component2 = function () {
    return this.field;
  };
  PositionedField.prototype.copy_39d550$ = function (position, field) {
    return new PositionedField(position === void 0 ? this.position : position, field === void 0 ? this.field : field);
  };
  PositionedField.prototype.toString = function () {
    return 'PositionedField(position=' + Kotlin.toString(this.position) + (', field=' + Kotlin.toString(this.field)) + ')';
  };
  PositionedField.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.position) | 0;
    result = result * 31 + Kotlin.hashCode(this.field) | 0;
    return result;
  };
  PositionedField.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.position, other.position) && Kotlin.equals(this.field, other.field)))));
  };
  function GridDisplay(canvas) {
    this.canvas = canvas;
    var tmp$;
    this.context = Kotlin.isType(tmp$ = this.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$ : throwCCE();
    this.hexagonal_0 = false;
    this.fieldSize = 50.0;
    this.gridThickness = 1.0;
    this.gridColor = 'black';
    this.outerBorder = 1.0;
    this.hexPath = new Path2D();
    this.hexPathOffset = new Path2D();
    this.hexDeltaX = 0.0;
    this.hexDeltaY = 0.0;
    this.translateX = 0.0;
    this.onClick = null;
    this.clickListener = GridDisplay$clickListener$lambda(this);
    this.canvas.addEventListener('click', this.clickListener);
  }
  GridDisplay.prototype.display_31tjs9$ = function (grid, fillStyle, draw) {
    if (fillStyle === void 0)
      fillStyle = null;
    if (draw === void 0)
      draw = null;
    var tmp$, tmp$_0, tmp$_1;
    var deltaX = this.hexagonal_0 ? this.hexDeltaX : this.fieldSize + this.gridThickness;
    var deltaY = this.hexagonal_0 ? this.hexDeltaY : this.fieldSize + this.gridThickness;
    var offset = this.hexagonal_0 ? (this.gridThickness + this.fieldSize) / 2 : 0.0;
    var extraY = this.hexagonal_0 ? this.fieldSize / (2 * Math_0.sqrt(3.0)) : 0.0;
    this.translateX = (this.canvas.clientWidth - grid.width * deltaX) / 2;
    this.context.fillStyle = this.gridColor;
    if (this.gridThickness > 0)
      this.context.fillRect(this.translateX + this.gridThickness - this.outerBorder, 0.0 + this.gridThickness - this.outerBorder, grid.height * deltaX - this.gridThickness + this.outerBorder * 2 + offset, grid.width * deltaY - this.gridThickness + this.outerBorder * 2 + extraY);
    tmp$ = grid.height;
    for (var y = 0; y < tmp$; y++) {
      tmp$_0 = grid.width;
      for (var x = 0; x < tmp$_0; x++) {
        this.context.fillStyle = (tmp$_1 = fillStyle != null ? fillStyle(grid.get_vux9f0$(x, y), x, y) : null) != null ? tmp$_1 : 'white';
        if (this.hexagonal_0)
          this.drawHexagon_0(x, y);
        else
          this.drawSquare_0(x, y);
        if (draw != null) {
          this.context.save();
          this.context.translate(x * deltaX + this.translateX + this.gridThickness + (y % 2 === 0 ? offset : 0.0), y * deltaY);
          draw(this.context, this.fieldSize, grid.get_vux9f0$(x, y), x, y);
          this.context.restore();
        }
      }
    }
  };
  GridDisplay.prototype.drawSquare_0 = function (x, y) {
    this.context.fillRect(this.translateX + this.gridThickness + x * (this.fieldSize + this.gridThickness), this.gridThickness + y * (this.fieldSize + this.gridThickness), this.fieldSize, this.fieldSize);
  };
  GridDisplay.prototype.drawHexagon_0 = function (x, y) {
    this.context.save();
    this.context.translate(x * this.hexDeltaX + this.translateX + this.gridThickness, y * this.hexDeltaY);
    this.context.fill(y % 2 === 0 ? this.hexPath : this.hexPathOffset);
    this.context.restore();
  };
  GridDisplay.prototype.showHexagons = function () {
    this.hexagonal_0 = true;
    this.hexDeltaX = this.fieldSize + this.gridThickness;
    this.hexDeltaY = 3 * (this.fieldSize / (2 * Math_0.sqrt(3.0))) + this.gridThickness / Math_0.sqrt(3.0);
    this.hexPath = this.createHexagonPath_0(false);
    this.hexPathOffset = this.createHexagonPath_0(true);
  };
  GridDisplay.prototype.createHexagonPath_0 = function (offset) {
    var halfWidth = this.fieldSize / 2;
    var fourthHeight = this.fieldSize / (2 * Math_0.sqrt(3.0));
    var offsetWidth = offset ? 0.0 : halfWidth + this.gridThickness / 2;
    var path = new Path2D();
    path.moveTo(0.0 + offsetWidth, fourthHeight);
    path.lineTo(halfWidth + offsetWidth, 0.0);
    path.lineTo(halfWidth * 2 + offsetWidth, fourthHeight);
    path.lineTo(halfWidth * 2 + offsetWidth, fourthHeight * 3);
    path.lineTo(halfWidth + offsetWidth, fourthHeight * 4);
    path.lineTo(0.0 + offsetWidth, fourthHeight * 3);
    path.closePath();
    return path;
  };
  GridDisplay.prototype.end = function () {
    var tmp$;
    this.canvas.removeEventListener('click', this.clickListener);
    var context = Kotlin.isType(tmp$ = this.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$ : throwCCE();
    context.clearRect(0.0, 0.0, this.canvas.width, this.canvas.height);
  };
  GridDisplay.prototype.gridCoordsAt_vux9f0$ = function (canvasX, canvasY) {
    if (this.hexagonal_0)
      return this.hexCoords_0(canvasX - numberToInt(this.translateX) | 0, canvasY);
    return this.squareCoords_0(canvasX - numberToInt(this.translateX) | 0, canvasY);
  };
  GridDisplay.prototype.hexCoords_0 = function (canvasX, canvasY) {
    var tmp$;
    var gridX = numberToInt(canvasX / this.hexDeltaX);
    var gridY = numberToInt(canvasY / this.hexDeltaY);
    var nearestPosition = new Position(gridX, gridY);
    var smallestDistance = this.distanceToHex_0(canvasX, canvasY, nearestPosition);
    tmp$ = nearestPosition.adjacentHexes().iterator();
    while (tmp$.hasNext()) {
      var hex = tmp$.next();
      var distance = this.distanceToHex_0(canvasX, canvasY, hex);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        nearestPosition = hex;
      }
    }
    return nearestPosition;
  };
  GridDisplay.prototype.distanceToHex_0 = function (canvasX, canvasY, hex) {
    var baseX = hex.x * this.hexDeltaX + this.hexDeltaX / 2 + (hex.y % 2 === 0 ? this.hexDeltaX / 2 : 0.0);
    var baseY = hex.y * this.hexDeltaY + this.hexDeltaY * 2 / 3;
    return (canvasX - baseX) * (canvasX - baseX) + (canvasY - baseY) * (canvasY - baseY);
  };
  GridDisplay.prototype.squareCoords_0 = function (canvasX, canvasY) {
    var localX = canvasX % (this.fieldSize + this.gridThickness);
    var localY = canvasY % (this.fieldSize + this.gridThickness);
    if (localX < this.gridThickness || localY < this.gridThickness)
      return null;
    var gridX = numberToInt(canvasX / (this.fieldSize + this.gridThickness));
    var gridY = numberToInt(canvasY / (this.fieldSize + this.gridThickness));
    return new Position(gridX, gridY);
  };
  function GridDisplay$clickListener$lambda(this$GridDisplay) {
    return function (event) {
      var tmp$, tmp$_0;
      Kotlin.isType(tmp$ = event, MouseEvent) ? tmp$ : throwCCE();
      var gridPosition = this$GridDisplay.gridCoordsAt_vux9f0$(numberToInt(event.offsetX), numberToInt(event.offsetY));
      if (gridPosition != null)
        (tmp$_0 = this$GridDisplay.onClick) != null ? tmp$_0(gridPosition) : null;
      return Unit;
    };
  }
  GridDisplay.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'GridDisplay',
    interfaces: []
  };
  function main$addButton$lambda(closure$game, closure$name, closure$header, closure$gameDisplay, closure$canvas, closure$playerArea, closure$gameArea) {
    return function (it) {
      var tmp$;
      (tmp$ = closure$game.v) != null ? (tmp$.end(), Unit) : null;
      closure$header.textContent = closure$name;
      closure$game.v = closure$gameDisplay(closure$canvas, closure$playerArea, closure$gameArea);
      return Unit;
    };
  }
  function main$addButton(closure$game, closure$header, closure$canvas, closure$playerArea, closure$gameArea) {
    return function (gameDisplay, name, navElement) {
      var tmp$;
      var button = Kotlin.isType(tmp$ = document.createElement('button'), HTMLButtonElement) ? tmp$ : throwCCE();
      button.textContent = name;
      navElement.appendChild(button);
      button.addEventListener('click', main$addButton$lambda(closure$game, name, closure$header, gameDisplay, closure$canvas, closure$playerArea, closure$gameArea));
    };
  }
  function main(args) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5;
    var header = Kotlin.isType(tmp$ = document.getElementById('header'), HTMLElement) ? tmp$ : throwCCE();
    var navigation = Kotlin.isType(tmp$_0 = document.getElementById('navigation'), HTMLElement) ? tmp$_0 : throwCCE();
    var playerArea = Kotlin.isType(tmp$_1 = document.getElementById('player-area'), HTMLElement) ? tmp$_1 : throwCCE();
    var gameArea = Kotlin.isType(tmp$_2 = document.getElementById('game-area'), HTMLElement) ? tmp$_2 : throwCCE();
    var canvas = Kotlin.isType(tmp$_3 = document.getElementById('canvas'), HTMLCanvasElement) ? tmp$_3 : throwCCE();
    var dpr = window.devicePixelRatio;
    var element = Kotlin.isType(tmp$_4 = canvas.parentElement, HTMLElement) ? tmp$_4 : throwCCE();
    var a = element.clientWidth;
    var b = window.innerHeight - navigation.clientHeight | 0;
    var styleSize = Math_0.min(a, b);
    var size = numberToInt(styleSize * dpr);
    canvas.style.width = styleSize.toString() + 'px';
    canvas.style.height = styleSize.toString() + 'px';
    canvas.width = size;
    canvas.height = size;
    var context = Kotlin.isType(tmp$_5 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_5 : throwCCE();
    context.scale(dpr, dpr);
    var game = {v: null};
    var addButton = main$addButton(game, header, canvas, playerArea, gameArea);
    addButton(getCallableRef('AlysDisplay', function (canvas, playerArea, gameArea) {
      return new AlysDisplay(canvas, playerArea, gameArea);
    }), 'Alys', navigation);
    addButton(getCallableRef('ChessDisplay', function (canvas, playerArea, gameArea) {
      return new ChessDisplay(canvas, playerArea, gameArea);
    }), 'Chess', navigation);
    addButton(getCallableRef('VirusDisplay', function (canvas, playerArea, gameArea) {
      return new VirusDisplay(canvas, playerArea, gameArea);
    }), 'Virus', navigation);
    addButton(getCallableRef('TicTacToeDisplay', function (canvas, playerArea, gameArea) {
      return new TicTacToeDisplay(canvas, playerArea, gameArea);
    }), 'Tic Tac Toe', navigation);
  }
  function Position(x, y) {
    this.x = x;
    this.y = y;
  }
  Position.prototype.add_vux9f0$ = function (i, j) {
    return new Position(this.x + i | 0, this.y + j | 0);
  };
  Position.prototype.adjacentHexes = function () {
    return listOf([this.hexNW_za3lpa$(), this.hexNE_za3lpa$(), this.hexW_za3lpa$(), this.hexE_za3lpa$(), this.hexSW_za3lpa$(), this.hexSE_za3lpa$()]);
  };
  Position.prototype.hexNW_za3lpa$ = function (distance) {
    if (distance === void 0)
      distance = 1;
    return new Position(this.x - (distance / 2 | 0) + ((this.y + distance | 0) % 2 === 0 ? -1 : 0) | 0, this.y - distance | 0);
  };
  Position.prototype.hexNE_za3lpa$ = function (distance) {
    if (distance === void 0)
      distance = 1;
    return new Position(this.x + (distance / 2 | 0) + ((this.y + distance | 0) % 2 === 0 ? 0 : 1) | 0, this.y - distance | 0);
  };
  Position.prototype.hexW_za3lpa$ = function (distance) {
    if (distance === void 0)
      distance = 1;
    return new Position(this.x - distance | 0, this.y);
  };
  Position.prototype.hexE_za3lpa$ = function (distance) {
    if (distance === void 0)
      distance = 1;
    return new Position(this.x + distance | 0, this.y);
  };
  Position.prototype.hexSW_za3lpa$ = function (distance) {
    if (distance === void 0)
      distance = 1;
    return new Position(this.x - (distance / 2 | 0) + ((this.y + distance | 0) % 2 === 0 ? -1 : 0) | 0, this.y + distance | 0);
  };
  Position.prototype.hexSE_za3lpa$ = function (distance) {
    if (distance === void 0)
      distance = 1;
    return new Position(this.x + (distance / 2 | 0) + ((this.y + distance | 0) % 2 === 0 ? 0 : 1) | 0, this.y + distance | 0);
  };
  Position.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Position',
    interfaces: []
  };
  Position.prototype.component1 = function () {
    return this.x;
  };
  Position.prototype.component2 = function () {
    return this.y;
  };
  Position.prototype.copy_vux9f0$ = function (x, y) {
    return new Position(x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  Position.prototype.toString = function () {
    return 'Position(x=' + Kotlin.toString(this.x) + (', y=' + Kotlin.toString(this.y)) + ')';
  };
  Position.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  Position.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  function TicTacToe(state) {
    TicTacToe$Companion_getInstance();
    if (state === void 0)
      state = new TicTacToeState();
    BoardGame.call(this);
    this.state_lbl02z$_0 = state;
  }
  Object.defineProperty(TicTacToe.prototype, 'state', {
    get: function () {
      return this.state_lbl02z$_0;
    },
    set: function (state) {
      this.state_lbl02z$_0 = state;
    }
  });
  function TicTacToe$Companion() {
    TicTacToe$Companion_instance = this;
    this.rules = listOf([new Rule("Can only place the current player's piece", TicTacToe$Companion$rules$lambda), new Rule('Can only place pieces on empty fields', TicTacToe$Companion$rules$lambda_0)]);
  }
  function TicTacToe$Companion$rules$lambda(action, state) {
    return state.currentPlayer === action.piece;
  }
  function TicTacToe$Companion$rules$lambda_0(action, state) {
    return state.board.get_vux9f0$(action.x, action.y) == null;
  }
  TicTacToe$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var TicTacToe$Companion_instance = null;
  function TicTacToe$Companion_getInstance() {
    if (TicTacToe$Companion_instance === null) {
      new TicTacToe$Companion();
    }
    return TicTacToe$Companion_instance;
  }
  TicTacToe.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TicTacToe',
    interfaces: [BoardGame]
  };
  function TicTacToeState(board, currentPlayer, players) {
    if (board === void 0)
      board = new Grid(3, 3, TicTacToeState_init$lambda);
    if (currentPlayer === void 0)
      currentPlayer = TicTacToePiece$Cross_getInstance();
    if (players === void 0)
      players = listOf([TicTacToePiece$Cross_getInstance(), TicTacToePiece$Circle_getInstance()]);
    this.board_pqdyqb$_0 = board;
    this.currentPlayer_itk6nz$_0 = currentPlayer;
    this.players_f3gykn$_0 = players;
  }
  Object.defineProperty(TicTacToeState.prototype, 'board', {
    get: function () {
      return this.board_pqdyqb$_0;
    }
  });
  Object.defineProperty(TicTacToeState.prototype, 'currentPlayer', {
    get: function () {
      return this.currentPlayer_itk6nz$_0;
    }
  });
  Object.defineProperty(TicTacToeState.prototype, 'players', {
    get: function () {
      return this.players_f3gykn$_0;
    }
  });
  TicTacToeState.prototype.confirmLegality_11rc$ = function (action) {
    var tmp$;
    tmp$ = TicTacToe$Companion_getInstance().rules.iterator();
    while (tmp$.hasNext()) {
      var rule = tmp$.next();
      if (!rule.isLegal(action, this))
        return Result$Companion_getInstance().failure_ytbaoo$(rule.description);
    }
    return Result$Companion_getInstance().success();
  };
  TicTacToeState.prototype.possibleActions = function () {
    var actions = ArrayList_init();
    for (var i = 0; i <= 2; i++) {
      for (var j = 0; j <= 2; j++)
        if (this.board.get_vux9f0$(i, j) == null)
          actions.add_11rb$(new TicTacToeAction(this.currentPlayer, i, j));
    }
    return toList(actions);
  };
  TicTacToeState.prototype.nextState_11rc$ = function (action) {
    var newBoard = this.board.copy_urw29u$();
    newBoard.set_vq7693$(action.x, action.y, action.piece);
    return new TicTacToeState(newBoard, this.currentPlayer === TicTacToePiece$Cross_getInstance() ? TicTacToePiece$Circle_getInstance() : TicTacToePiece$Cross_getInstance());
  };
  TicTacToeState.prototype.findWinner = function () {
    if (this.hasPieceWon_0(TicTacToePiece$Cross_getInstance()))
      return TicTacToePiece$Cross_getInstance();
    else if (this.hasPieceWon_0(TicTacToePiece$Circle_getInstance()))
      return TicTacToePiece$Circle_getInstance();
    return null;
  };
  TicTacToeState.prototype.hasPieceWon_0 = function (piece) {
    if (equals(this.board.get_vux9f0$(0, 0), piece) && equals(this.board.get_vux9f0$(0, 1), piece) && equals(this.board.get_vux9f0$(0, 2), piece) || (equals(this.board.get_vux9f0$(1, 0), piece) && equals(this.board.get_vux9f0$(1, 1), piece) && equals(this.board.get_vux9f0$(1, 2), piece)) || (equals(this.board.get_vux9f0$(2, 0), piece) && equals(this.board.get_vux9f0$(2, 1), piece) && equals(this.board.get_vux9f0$(2, 2), piece)))
      return true;
    if (equals(this.board.get_vux9f0$(0, 0), piece) && equals(this.board.get_vux9f0$(1, 0), piece) && equals(this.board.get_vux9f0$(2, 0), piece) || (equals(this.board.get_vux9f0$(0, 1), piece) && equals(this.board.get_vux9f0$(1, 1), piece) && equals(this.board.get_vux9f0$(2, 1), piece)) || (equals(this.board.get_vux9f0$(0, 2), piece) && equals(this.board.get_vux9f0$(1, 2), piece) && equals(this.board.get_vux9f0$(2, 2), piece)))
      return true;
    if (equals(this.board.get_vux9f0$(0, 0), piece) && equals(this.board.get_vux9f0$(1, 1), piece) && equals(this.board.get_vux9f0$(2, 2), piece) || (equals(this.board.get_vux9f0$(0, 2), piece) && equals(this.board.get_vux9f0$(1, 1), piece) && equals(this.board.get_vux9f0$(2, 0), piece)))
      return true;
    return false;
  };
  function TicTacToeState_init$lambda(f, f_0) {
    return null;
  }
  TicTacToeState.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TicTacToeState',
    interfaces: [BoardGameState]
  };
  TicTacToeState.prototype.component1 = function () {
    return this.board;
  };
  TicTacToeState.prototype.component2 = function () {
    return this.currentPlayer;
  };
  TicTacToeState.prototype.component3 = function () {
    return this.players;
  };
  TicTacToeState.prototype.copy_2sqnw4$ = function (board, currentPlayer, players) {
    return new TicTacToeState(board === void 0 ? this.board : board, currentPlayer === void 0 ? this.currentPlayer : currentPlayer, players === void 0 ? this.players : players);
  };
  TicTacToeState.prototype.toString = function () {
    return 'TicTacToeState(board=' + Kotlin.toString(this.board) + (', currentPlayer=' + Kotlin.toString(this.currentPlayer)) + (', players=' + Kotlin.toString(this.players)) + ')';
  };
  TicTacToeState.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.board) | 0;
    result = result * 31 + Kotlin.hashCode(this.currentPlayer) | 0;
    result = result * 31 + Kotlin.hashCode(this.players) | 0;
    return result;
  };
  TicTacToeState.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.board, other.board) && Kotlin.equals(this.currentPlayer, other.currentPlayer) && Kotlin.equals(this.players, other.players)))));
  };
  function TicTacToePiece(name, ordinal) {
    Enum.call(this);
    this.name$ = name;
    this.ordinal$ = ordinal;
  }
  function TicTacToePiece_initFields() {
    TicTacToePiece_initFields = function () {
    };
    TicTacToePiece$Cross_instance = new TicTacToePiece('Cross', 0);
    TicTacToePiece$Circle_instance = new TicTacToePiece('Circle', 1);
  }
  var TicTacToePiece$Cross_instance;
  function TicTacToePiece$Cross_getInstance() {
    TicTacToePiece_initFields();
    return TicTacToePiece$Cross_instance;
  }
  var TicTacToePiece$Circle_instance;
  function TicTacToePiece$Circle_getInstance() {
    TicTacToePiece_initFields();
    return TicTacToePiece$Circle_instance;
  }
  TicTacToePiece.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TicTacToePiece',
    interfaces: [Enum]
  };
  function TicTacToePiece$values() {
    return [TicTacToePiece$Cross_getInstance(), TicTacToePiece$Circle_getInstance()];
  }
  TicTacToePiece.values = TicTacToePiece$values;
  function TicTacToePiece$valueOf(name) {
    switch (name) {
      case 'Cross':
        return TicTacToePiece$Cross_getInstance();
      case 'Circle':
        return TicTacToePiece$Circle_getInstance();
      default:throwISE('No enum constant TicTacToePiece.' + name);
    }
  }
  TicTacToePiece.valueOf_61zpoe$ = TicTacToePiece$valueOf;
  function TicTacToeAction(piece, x, y) {
    this.piece = piece;
    this.x = x;
    this.y = y;
  }
  TicTacToeAction.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TicTacToeAction',
    interfaces: []
  };
  TicTacToeAction.prototype.component1 = function () {
    return this.piece;
  };
  TicTacToeAction.prototype.component2 = function () {
    return this.x;
  };
  TicTacToeAction.prototype.component3 = function () {
    return this.y;
  };
  TicTacToeAction.prototype.copy_esb5v0$ = function (piece, x, y) {
    return new TicTacToeAction(piece === void 0 ? this.piece : piece, x === void 0 ? this.x : x, y === void 0 ? this.y : y);
  };
  TicTacToeAction.prototype.toString = function () {
    return 'TicTacToeAction(piece=' + Kotlin.toString(this.piece) + (', x=' + Kotlin.toString(this.x)) + (', y=' + Kotlin.toString(this.y)) + ')';
  };
  TicTacToeAction.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.piece) | 0;
    result = result * 31 + Kotlin.hashCode(this.x) | 0;
    result = result * 31 + Kotlin.hashCode(this.y) | 0;
    return result;
  };
  TicTacToeAction.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.piece, other.piece) && Kotlin.equals(this.x, other.x) && Kotlin.equals(this.y, other.y)))));
  };
  function TicTacToeDisplay(canvas, playerArea, gameArea) {
    GameDisplay.call(this, canvas, playerArea, gameArea);
    this.game_p4bo12$_0 = new TicTacToe();
    this.getColor_fajsqn$_0 = null;
    this.draw_p5ofi0$_0 = TicTacToeDisplay$draw$lambda;
    var $receiver = this.game.players;
    var key = TicTacToePiece$Cross_getInstance();
    $receiver.put_xwzc9p$(key, 'Cross');
    var $receiver_0 = this.players;
    var value = new Player();
    $receiver_0.put_xwzc9p$('Cross', value);
    var $receiver_1 = this.game.players;
    var key_0 = TicTacToePiece$Circle_getInstance();
    $receiver_1.put_xwzc9p$(key_0, 'Circle');
    var $receiver_2 = this.players;
    var value_0 = new RandomAIPlayer();
    $receiver_2.put_xwzc9p$('Circle', value_0);
    this.gridDisplay.outerBorder = 0.0;
    this.updateDisplay_pdl1vj$(null);
    this.gridDisplay.onClick = TicTacToeDisplay_init$lambda(this);
  }
  Object.defineProperty(TicTacToeDisplay.prototype, 'game', {
    get: function () {
      return this.game_p4bo12$_0;
    },
    set: function (game) {
      this.game_p4bo12$_0 = game;
    }
  });
  Object.defineProperty(TicTacToeDisplay.prototype, 'getColor', {
    get: function () {
      return this.getColor_fajsqn$_0;
    }
  });
  Object.defineProperty(TicTacToeDisplay.prototype, 'draw', {
    get: function () {
      return this.draw_p5ofi0$_0;
    }
  });
  function TicTacToeDisplay$draw$lambda(context, fieldSize, piece, f, f_0) {
    context.fillStyle = 'black';
    context.font = fieldSize.toString() + 'px arial';
    context.textBaseline = 'top';
    if (equals(piece, TicTacToePiece$Cross_getInstance()))
      context.fillText('X', 0.0, 0.0);
    else if (equals(piece, TicTacToePiece$Circle_getInstance()))
      context.fillText('O', 0.0, 0.0);
    return Unit;
  }
  function TicTacToeDisplay_init$lambda(this$TicTacToeDisplay) {
    return function (it) {
      var $receiver = this$TicTacToeDisplay.players;
      var key = this$TicTacToeDisplay.game.currentPlayer();
      var tmp$;
      if (Kotlin.isType((Kotlin.isType(tmp$ = $receiver, Map) ? tmp$ : throwCCE()).get_11rb$(key), Player) && it.x >= 0 && it.y >= 0 && it.x < 3 && it.y < 3)
        this$TicTacToeDisplay.performAction_11re$(new TicTacToeAction(this$TicTacToeDisplay.game.state.currentPlayer, it.x, it.y));
      return Unit;
    };
  }
  TicTacToeDisplay.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'TicTacToeDisplay',
    interfaces: [GameDisplay]
  };
  function Virus(state) {
    Virus$Companion_getInstance();
    if (state === void 0)
      state = new VirusState();
    BoardGame.call(this);
    this.state_bleigq$_0 = state;
  }
  Object.defineProperty(Virus.prototype, 'state', {
    get: function () {
      return this.state_bleigq$_0;
    },
    set: function (state) {
      this.state_bleigq$_0 = state;
    }
  });
  function Virus$Companion() {
    Virus$Companion_instance = this;
    this.rules = listOf([new Rule('Cannot place piece outside board', Virus$Companion$rules$lambda), new Rule("Can only place the current player's piece", Virus$Companion$rules$lambda_0), new Rule('Can only place pieces on empty fields', Virus$Companion$rules$lambda_1), new Rule('Cannot move farther than two squares', Virus$Companion$rules$lambda_2)]);
  }
  function Virus$Companion$rules$lambda(action, state) {
    return state.board.isWithinBounds_dfplqh$(action.source) && state.board.isWithinBounds_dfplqh$(action.destination);
  }
  function Virus$Companion$rules$lambda_0(action, state) {
    return state.board.get_vux9f0$(action.source.x, action.source.y) === state.currentPlayer;
  }
  function Virus$Companion$rules$lambda_1(action, state) {
    return state.board.get_vux9f0$(action.destination.x, action.destination.y) !== 0;
  }
  function Virus$Companion$rules$lambda_2(action, state) {
    return abs(action.source.x - action.destination.x | 0) > 2 || abs(action.source.y - action.destination.y | 0) <= 2;
  }
  Virus$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Virus$Companion_instance = null;
  function Virus$Companion_getInstance() {
    if (Virus$Companion_instance === null) {
      new Virus$Companion();
    }
    return Virus$Companion_instance;
  }
  Virus.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Virus',
    interfaces: [BoardGame]
  };
  function VirusState(width, height, playerCount, board, currentPlayer, players) {
    if (width === void 0)
      width = 5;
    if (height === void 0)
      height = 5;
    if (playerCount === void 0)
      playerCount = 2;
    if (board === void 0)
      board = new Grid(width, height, VirusState_init$lambda(playerCount, height));
    if (currentPlayer === void 0)
      currentPlayer = 1;
    if (players === void 0)
      players = toList(new IntRange(1, playerCount));
    this.width = width;
    this.height = height;
    this.playerCount = playerCount;
    this.board_8pifzm$_0 = board;
    this.currentPlayer_54tmti$_0 = currentPlayer;
    this.players_h1tl8i$_0 = players;
  }
  Object.defineProperty(VirusState.prototype, 'board', {
    get: function () {
      return this.board_8pifzm$_0;
    }
  });
  Object.defineProperty(VirusState.prototype, 'currentPlayer', {
    get: function () {
      return this.currentPlayer_54tmti$_0;
    }
  });
  Object.defineProperty(VirusState.prototype, 'players', {
    get: function () {
      return this.players_h1tl8i$_0;
    }
  });
  VirusState.prototype.confirmLegality_11rc$ = function (action) {
    var tmp$;
    tmp$ = Virus$Companion_getInstance().rules.iterator();
    while (tmp$.hasNext()) {
      var rule = tmp$.next();
      if (!rule.isLegal(action, this))
        return Result$Companion_getInstance().failure_ytbaoo$(rule.description);
    }
    return Result$Companion_getInstance().success();
  };
  VirusState.prototype.possibleActions = function () {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    var actions = ArrayList_init();
    tmp$ = this.width;
    for (var i = 0; i < tmp$; i++) {
      tmp$_0 = this.height;
      for (var j = 0; j < tmp$_0; j++) {
        if (this.board.get_vux9f0$(i, j) !== 0)
          continue;
        var exists = false;
        var b = i - 2 | 0;
        tmp$_1 = Math_0.max(0, b);
        var a = this.width;
        var b_0 = i + 3 | 0;
        tmp$_2 = Math_0.min(a, b_0);
        for (var n = tmp$_1; n < tmp$_2; n++) {
          var b_1 = j - 2 | 0;
          tmp$_3 = Math_0.max(0, b_1);
          var a_0 = this.height;
          var b_2 = j + 3 | 0;
          tmp$_4 = Math_0.min(a_0, b_2);
          for (var m = tmp$_3; m < tmp$_4; m++) {
            if (this.board.get_vux9f0$(n, m) !== this.currentPlayer)
              continue;
            var action = new VirusAction(new Position(n, m), new Position(i, j));
            if (abs(action.source.x - action.destination.x | 0) > 1 || abs(action.source.y - action.destination.y | 0) > 1) {
              actions.add_11rb$(action);
            }
             else if (!exists) {
              actions.add_11rb$(action);
              exists = true;
            }
          }
        }
      }
    }
    return toList(actions);
  };
  VirusState.prototype.nextState_11rc$ = function (action) {
    var newBoard = this.board.copy_urw29u$();
    if (abs(action.source.x - action.destination.x | 0) > 1 || abs(action.source.y - action.destination.y | 0) > 1)
      newBoard.set_vq7693$(action.source.x, action.source.y, 0);
    newBoard.set_vq7693$(action.destination.x, action.destination.y, this.currentPlayer);
    this.switchSurroundings_0(action.destination, newBoard);
    var movablePlayers = this.findMovablePlayers_0(newBoard);
    var nextPlayer = this.currentPlayer + 1 | 0;
    var destination = ArrayList_init();
    var tmp$;
    tmp$ = movablePlayers.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (element)
        destination.add_11rb$(element);
    }
    if (destination.isEmpty()) {
      nextPlayer = 0;
    }
     else {
      if (nextPlayer > this.playerCount)
        nextPlayer = 1;
      while (!movablePlayers.get_za3lpa$(nextPlayer)) {
        nextPlayer = nextPlayer + 1 | 0;
        if (nextPlayer > this.playerCount)
          nextPlayer = 1;
      }
    }
    return new VirusState(void 0, void 0, void 0, newBoard, nextPlayer);
  };
  VirusState.prototype.findWinner = function () {
    var tmp$, tmp$_0;
    var size = this.playerCount + 1 | 0;
    var list = ArrayList_init_0(size);
    for (var index = 0; index < size; index++) {
      list.add_11rb$(0);
    }
    var pieces = list;
    tmp$ = this.board.fields.iterator();
    while (tmp$.hasNext()) {
      var field = tmp$.next();
      pieces.set_wxm5ur$(field, pieces.get_za3lpa$(field) + 1 | 0);
    }
    var movablePlayers = this.findMovablePlayers_0(this.board);
    var destination = ArrayList_init();
    var tmp$_1;
    tmp$_1 = movablePlayers.iterator();
    while (tmp$_1.hasNext()) {
      var element = tmp$_1.next();
      if (element)
        destination.add_11rb$(element);
    }
    if (destination.size > 1)
      return null;
    var indexOfLast$result;
    indexOfLast$break: do {
      var iterator = movablePlayers.listIterator_za3lpa$(movablePlayers.size);
      while (iterator.hasPrevious()) {
        if (iterator.previous()) {
          indexOfLast$result = iterator.nextIndex();
          break indexOfLast$break;
        }
      }
      indexOfLast$result = -1;
    }
     while (false);
    var lastPlayer = indexOfLast$result;
    if (lastPlayer > 0)
      pieces.set_wxm5ur$(lastPlayer, pieces.get_za3lpa$(lastPlayer) + pieces.get_za3lpa$(0) | 0);
    var max = 0;
    var winner = 0;
    tmp$_0 = this.playerCount;
    for (var i = 1; i <= tmp$_0; i++) {
      if (pieces.get_za3lpa$(i) > max) {
        max = pieces.get_za3lpa$(i);
        winner = i;
      }
    }
    return winner;
  };
  VirusState.prototype.findMovablePlayers_0 = function (board) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4;
    var size = this.playerCount + 1 | 0;
    var list = ArrayList_init_0(size);
    for (var index = 0; index < size; index++) {
      list.add_11rb$(false);
    }
    var movablePlayers = list;
    tmp$ = this.width;
    loop: for (var i = 0; i < tmp$; i++) {
      tmp$_0 = this.height;
      for (var j = 0; j < tmp$_0; j++) {
        if (board.get_vux9f0$(i, j) !== 0)
          continue;
        var b = i - 2 | 0;
        tmp$_1 = Math_0.max(0, b);
        var a = this.width;
        var b_0 = i + 3 | 0;
        tmp$_2 = Math_0.min(a, b_0);
        for (var n = tmp$_1; n < tmp$_2; n++) {
          var b_1 = j - 2 | 0;
          tmp$_3 = Math_0.max(0, b_1);
          var a_0 = this.height;
          var b_2 = j + 3 | 0;
          tmp$_4 = Math_0.min(a_0, b_2);
          for (var m = tmp$_3; m < tmp$_4; m++) {
            if (board.get_vux9f0$(n, m) > 0)
              movablePlayers.set_wxm5ur$(board.get_vux9f0$(n, m), true);
            var destination = ArrayList_init();
            var tmp$_5;
            tmp$_5 = movablePlayers.iterator();
            while (tmp$_5.hasNext()) {
              var element = tmp$_5.next();
              if (element)
                destination.add_11rb$(element);
            }
            if (destination.size === this.playerCount)
              break loop;
          }
        }
      }
    }
    return movablePlayers;
  };
  VirusState.prototype.switchSurroundings_0 = function (position, board) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    var b = position.x - 1 | 0;
    tmp$ = Math_0.max(0, b);
    var a = this.width - 1 | 0;
    var b_0 = position.x + 1 | 0;
    tmp$_0 = Math_0.min(a, b_0);
    for (var n = tmp$; n <= tmp$_0; n++) {
      var b_1 = position.y - 1 | 0;
      tmp$_1 = Math_0.max(0, b_1);
      var a_0 = this.height - 1 | 0;
      var b_2 = position.y + 1 | 0;
      tmp$_2 = Math_0.min(a_0, b_2);
      for (var m = tmp$_1; m <= tmp$_2; m++) {
        if (board.get_vux9f0$(n, m) !== 0)
          board.set_vq7693$(n, m, this.currentPlayer);
      }
    }
  };
  function VirusState_init$lambda(closure$playerCount, closure$height) {
    return function (x, y) {
      if (x === 0 && y === 0) {
        switch (closure$playerCount) {
          case 2:
            return 1;
          case 3:
            return 1;
          case 4:
            return 1;
          default:return 1;
        }
      }
       else if (x === 0 && y === (closure$height - 1 | 0)) {
        switch (closure$playerCount) {
          case 2:
            return 2;
          case 3:
            return 2;
          case 4:
            return 2;
          default:return 0;
        }
      }
       else if (x === (closure$height - 1 | 0) && y === 0) {
        switch (closure$playerCount) {
          case 2:
            return 2;
          case 3:
            return 3;
          case 4:
            return 3;
          default:return 0;
        }
      }
       else if (x === (closure$height - 1 | 0) && y === (closure$height - 1 | 0)) {
        switch (closure$playerCount) {
          case 2:
            return 1;
          case 3:
            return 0;
          case 4:
            return 4;
          default:return 0;
        }
      }
       else
        return 0;
    };
  }
  VirusState.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'VirusState',
    interfaces: [BoardGameState]
  };
  VirusState.prototype.component1 = function () {
    return this.width;
  };
  VirusState.prototype.component2 = function () {
    return this.height;
  };
  VirusState.prototype.component3 = function () {
    return this.playerCount;
  };
  VirusState.prototype.component4 = function () {
    return this.board;
  };
  VirusState.prototype.component5 = function () {
    return this.currentPlayer;
  };
  VirusState.prototype.component6 = function () {
    return this.players;
  };
  VirusState.prototype.copy_r8hqx5$ = function (width, height, playerCount, board, currentPlayer, players) {
    return new VirusState(width === void 0 ? this.width : width, height === void 0 ? this.height : height, playerCount === void 0 ? this.playerCount : playerCount, board === void 0 ? this.board : board, currentPlayer === void 0 ? this.currentPlayer : currentPlayer, players === void 0 ? this.players : players);
  };
  VirusState.prototype.toString = function () {
    return 'VirusState(width=' + Kotlin.toString(this.width) + (', height=' + Kotlin.toString(this.height)) + (', playerCount=' + Kotlin.toString(this.playerCount)) + (', board=' + Kotlin.toString(this.board)) + (', currentPlayer=' + Kotlin.toString(this.currentPlayer)) + (', players=' + Kotlin.toString(this.players)) + ')';
  };
  VirusState.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.width) | 0;
    result = result * 31 + Kotlin.hashCode(this.height) | 0;
    result = result * 31 + Kotlin.hashCode(this.playerCount) | 0;
    result = result * 31 + Kotlin.hashCode(this.board) | 0;
    result = result * 31 + Kotlin.hashCode(this.currentPlayer) | 0;
    result = result * 31 + Kotlin.hashCode(this.players) | 0;
    return result;
  };
  VirusState.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.width, other.width) && Kotlin.equals(this.height, other.height) && Kotlin.equals(this.playerCount, other.playerCount) && Kotlin.equals(this.board, other.board) && Kotlin.equals(this.currentPlayer, other.currentPlayer) && Kotlin.equals(this.players, other.players)))));
  };
  function VirusAction(source, destination) {
    this.source = source;
    this.destination = destination;
  }
  VirusAction.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'VirusAction',
    interfaces: []
  };
  VirusAction.prototype.component1 = function () {
    return this.source;
  };
  VirusAction.prototype.component2 = function () {
    return this.destination;
  };
  VirusAction.prototype.copy_vwqnnw$ = function (source, destination) {
    return new VirusAction(source === void 0 ? this.source : source, destination === void 0 ? this.destination : destination);
  };
  VirusAction.prototype.toString = function () {
    return 'VirusAction(source=' + Kotlin.toString(this.source) + (', destination=' + Kotlin.toString(this.destination)) + ')';
  };
  VirusAction.prototype.hashCode = function () {
    var result = 0;
    result = result * 31 + Kotlin.hashCode(this.source) | 0;
    result = result * 31 + Kotlin.hashCode(this.destination) | 0;
    return result;
  };
  VirusAction.prototype.equals = function (other) {
    return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.source, other.source) && Kotlin.equals(this.destination, other.destination)))));
  };
  function VirusDisplay(canvas, playerArea, gameArea) {
    GameDisplay.call(this, canvas, playerArea, gameArea);
    this.game_rcjipt$_0 = new Virus();
    this.getColor_csj3a4$_0 = VirusDisplay$getColor$lambda;
    this.draw_rdwa6r$_0 = null;
    var $receiver = this.game.players;
    var value = 'Player 1';
    $receiver.put_xwzc9p$(1, value);
    var $receiver_0 = this.players;
    var key = 'Player 1';
    var value_0 = new Player();
    $receiver_0.put_xwzc9p$(key, value_0);
    var $receiver_1 = this.game.players;
    var value_1 = 'Player 2';
    $receiver_1.put_xwzc9p$(2, value_1);
    var $receiver_2 = this.players;
    var key_0 = 'Player 2';
    var value_2 = new RandomAIPlayer();
    $receiver_2.put_xwzc9p$(key_0, value_2);
    this.updateDisplay_pdl1vj$(null);
    var sourcePosition = {v: null};
    this.gridDisplay.onClick = VirusDisplay_init$lambda(this, sourcePosition);
  }
  Object.defineProperty(VirusDisplay.prototype, 'game', {
    get: function () {
      return this.game_rcjipt$_0;
    },
    set: function (game) {
      this.game_rcjipt$_0 = game;
    }
  });
  Object.defineProperty(VirusDisplay.prototype, 'getColor', {
    get: function () {
      return this.getColor_csj3a4$_0;
    }
  });
  Object.defineProperty(VirusDisplay.prototype, 'draw', {
    get: function () {
      return this.draw_rdwa6r$_0;
    }
  });
  function VirusDisplay$getColor$lambda(piece, f, f_0) {
    switch (piece) {
      case 0:
        return 'white';
      case 1:
        return 'yellow';
      case 2:
        return 'red';
      default:return 'green';
    }
  }
  function VirusDisplay_init$lambda(this$VirusDisplay, closure$sourcePosition) {
    return function (it) {
      var $receiver = this$VirusDisplay.players;
      var key = this$VirusDisplay.game.currentPlayer();
      var tmp$;
      if (Kotlin.isType((Kotlin.isType(tmp$ = $receiver, Map) ? tmp$ : throwCCE()).get_11rb$(key), Player) && it.x >= 0 && it.y >= 0 && it.x < this$VirusDisplay.game.state.width && it.y < this$VirusDisplay.game.state.height) {
        var source = closure$sourcePosition.v;
        if (source == null) {
          closure$sourcePosition.v = new Position(it.x, it.y);
        }
         else {
          closure$sourcePosition.v = null;
          this$VirusDisplay.performAction_11re$(new VirusAction(source, new Position(it.x, it.y)));
        }
      }
      return Unit;
    };
  }
  VirusDisplay.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'VirusDisplay',
    interfaces: [GameDisplay]
  };
  Object.defineProperty(Alys, 'Companion', {
    get: Alys$Companion_getInstance
  });
  _.Alys = Alys;
  _.AlysField = AlysField;
  _.AlysPiece = AlysPiece;
  Object.defineProperty(AlysType, 'Fort', {
    get: AlysType$Fort_getInstance
  });
  Object.defineProperty(AlysType, 'Soldier', {
    get: AlysType$Soldier_getInstance
  });
  Object.defineProperty(AlysType, 'Grave', {
    get: AlysType$Grave_getInstance
  });
  Object.defineProperty(AlysType, 'Tree', {
    get: AlysType$Tree_getInstance
  });
  Object.defineProperty(AlysType, 'CoastTree', {
    get: AlysType$CoastTree_getInstance
  });
  _.AlysType = AlysType;
  _.AlysAction = AlysAction;
  _.WithOriginAndDestination = WithOriginAndDestination;
  _.AlysMoveAction = AlysMoveAction;
  _.AlysCreateAction = AlysCreateAction;
  _.AlysEndTurnAction = AlysEndTurnAction;
  _.AlysRule = AlysRule;
  _.AlysActionInfo = AlysActionInfo;
  _.AlysBoardCreator = AlysBoardCreator;
  _.AlysDisplay = AlysDisplay;
  $$importsForInline$$.Tern = _;
  Object.defineProperty(AlysState, 'Companion', {
    get: AlysState$Companion_getInstance
  });
  _.AlysState = AlysState;
  _.BoardGame = BoardGame;
  _.BoardGameState = BoardGameState;
  Object.defineProperty(Result, 'Companion', {
    get: Result$Companion_getInstance
  });
  _.Failure = Failure;
  _.Success = Success;
  _.Result = Result;
  _.Rule = Rule;
  _.Chess = Chess;
  _.ChessState = ChessState;
  _.ChessAction = ChessAction;
  Object.defineProperty(ChessPieceType, 'King', {
    get: ChessPieceType$King_getInstance
  });
  Object.defineProperty(ChessPieceType, 'Queen', {
    get: ChessPieceType$Queen_getInstance
  });
  Object.defineProperty(ChessPieceType, 'Bishop', {
    get: ChessPieceType$Bishop_getInstance
  });
  Object.defineProperty(ChessPieceType, 'Knight', {
    get: ChessPieceType$Knight_getInstance
  });
  Object.defineProperty(ChessPieceType, 'Rook', {
    get: ChessPieceType$Rook_getInstance
  });
  Object.defineProperty(ChessPieceType, 'Pawn', {
    get: ChessPieceType$Pawn_getInstance
  });
  _.ChessPieceType = ChessPieceType;
  Object.defineProperty(ChessPlayer, 'White', {
    get: ChessPlayer$White_getInstance
  });
  Object.defineProperty(ChessPlayer, 'Black', {
    get: ChessPlayer$Black_getInstance
  });
  _.ChessPlayer = ChessPlayer;
  _.ChessDisplay = ChessDisplay;
  _.ChessPiece = ChessPiece;
  _.GameDisplay = GameDisplay;
  _.Player = Player;
  _.AIPlayer = AIPlayer;
  _.RandomAIPlayer = RandomAIPlayer;
  _.Grid = Grid;
  _.PositionedField = PositionedField;
  _.GridDisplay = GridDisplay;
  _.main_kand9s$ = main;
  _.Position = Position;
  Object.defineProperty(TicTacToe, 'Companion', {
    get: TicTacToe$Companion_getInstance
  });
  _.TicTacToe = TicTacToe;
  _.TicTacToeState = TicTacToeState;
  Object.defineProperty(TicTacToePiece, 'Cross', {
    get: TicTacToePiece$Cross_getInstance
  });
  Object.defineProperty(TicTacToePiece, 'Circle', {
    get: TicTacToePiece$Circle_getInstance
  });
  _.TicTacToePiece = TicTacToePiece;
  _.TicTacToeAction = TicTacToeAction;
  _.TicTacToeDisplay = TicTacToeDisplay;
  Object.defineProperty(Virus, 'Companion', {
    get: Virus$Companion_getInstance
  });
  _.Virus = Virus;
  _.VirusState = VirusState;
  _.VirusAction = VirusAction;
  _.VirusDisplay = VirusDisplay;
  main([]);
  Kotlin.defineModule('Tern', _);
  return _;
}(typeof Tern === 'undefined' ? {} : Tern, kotlin, this['kotlinx-coroutines-core']);
