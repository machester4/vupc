const randomize = require('randomatic');
const debug = require('debug')('socket:server');
const FIND_ANSWER_WITH_CODE = 'answer-want-connect';
const GENERATE_OFFER_CODE = 'assign-offer-code';
const ANSWER_WANT_OFFER_SIGNAL = 'answer-want-offer-signal';
const ANSWER_SIGNAL = 'answer-signal';

var offers = [];
function initialize(io) {
  debug('socket initialized');

  io.on('connection', (client) => {
    debug('user connection');

    /**
     * ========================
     * ===== Offer events =====
     * ========================
    /**
     * First event fired after connect and create offer
     */
    client.on(GENERATE_OFFER_CODE, (offer, callback) => {
      debug(GENERATE_OFFER_CODE);
      let code = randomize('A', 5);
      offers.push({
        client,
        offer,
        code,
      });
      callback(code);
    });

    /**
     * =========================
     * ===== Answer events =====
     * =========================
     * When user insert rand code
     */
    client.on(FIND_ANSWER_WITH_CODE, (code, callback) => {
      debug(FIND_ANSWER_WITH_CODE);
      let exist = offers.find((offer) => offer.code === code);
      callback(exist ? exist.offer : null);
    });

    /**
     * When Answer signaled to Offer and waits for Offer to signalize it
     * data contain {answer, code}
     */
    client.on(ANSWER_WANT_OFFER_SIGNAL, (data) => {
      debug(ANSWER_WANT_OFFER_SIGNAL);
      let exist = offers.find((offer) => offer.code === data.code);
      exist.client.emit(ANSWER_SIGNAL, data.answer);
    });

    client.on('disconnect', () => {
      debug('user disconnect');
      offers = offers.filter((offer) => offer.client.id !== client.id);
    });
  });
}

module.exports = initialize;
