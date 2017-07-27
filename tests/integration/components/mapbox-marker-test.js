import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import mockMarker from 'dummy/tests/helpers/mock-marker';

moduleForComponent('mapbox-marker', 'Integration | Component | mapbox marker', {
  integration: true,

  beforeEach() {
    L.marker = function() {
      return mockMarker;
    };

    L.mapbox.marker.icon = function() {

    };
  }
});

skip('it updates the marker coordinates when changed', function(assert) {
  //assert.expect(3);
  //L.mapbox.marker([0,0]);

  //this.render(hbs`{{mapbox-marker coordinates=(mapbox-coords 23.333, 45.422)}}`);
});

test('it sets the marker color size and symbol', function(assert) {
  assert.expect(3);

  L.mapbox.marker.icon = function(params) {
    assert.equal(params['marker-color'], 'red');
    assert.equal(params['marker-size'], 'large');
    assert.equal(params['marker-symbol'], 'circle');
  };

  this.render(hbs`{{mapbox-marker color='red' size='large' symbol='circle'}}`);
});

test('it registers an event for onclick', function(assert) {
  assert.expect(1);

  this.on('explode', function() {
    assert.ok(true);
  });

  mockMarker.on = function(e, method) {
    if (e === 'click') {
      method();
    }
  };

  L.marker = function() {
    return mockMarker;
  };

  this.render(hbs`{{mapbox-marker onclick='explode'}}`);
});

test('it registers an event for onpopupopen', function(assert) {
  assert.expect(1);

  this.on('explode', function() {
    assert.ok(true);
  });

  mockMarker.on = function(e, method) {
    if (e === 'popupopen') {
      method();
    }
  };

  L.marker = function() {
    return mockMarker;
  };

  this.render(hbs`{{mapbox-marker onpopupopen='explode'}}`);
});

test('it registers an event for onremove', function(assert) {
  assert.expect(1);

  this.on('explode', function() {
    assert.ok(true);
  });

  mockMarker.on = function(e, method) {
    if (e === 'remove') {
      method();
    }
  };

  L.marker = function() {
    return mockMarker;
  };

  this.render(hbs`{{mapbox-marker onremove='explode'}}`);
});
