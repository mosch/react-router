require('./helper');
var Route = require('../modules/components/Route');
var Redirect = require('../modules/components/Redirect');
var Routes = require('../modules/components/Routes');

describe('a Redirect', function () {

  it('redirects from old to new', function (done) {
    var descriptor = Redirect({ from: 'old', to: 'new' });

    expect(descriptor.props.path).toEqual('old');

    var fakeTransition = {
      redirect: function(to) {
        expect(to).toEqual('new');
        done();
      }
    };

    descriptor.props.handler.willTransitionTo(fakeTransition);
  });

  it('uses params and query from current path', function (done) {
    var descriptor = Redirect({ from: 'old', to: 'new' });
    var expectedParams = { foo: 'bar' };
    var expectedQuery = { baz: 'qux' };

    var fakeTransition = {
      redirect: function(to, params, query) {
        expect(params).toEqual(expectedParams);
        expect(query).toEqual(expectedQuery);
        done();
      }
    };

    descriptor.props.handler.willTransitionTo(fakeTransition, expectedParams, expectedQuery);
  });

  it('uses params and query from the Redirect definition', function (done) {
    var expectedParams = { foo: 'bar' };
    var expectedQuery = { baz: 'qux' };
    var fakePathParams = { hooba: 'scooba' };
    var fakePathQuery = { doobie: 'scoobie' };

    var descriptor = Redirect({
      from: 'old',
      to: 'new',
      params: expectedParams,
      query: expectedQuery
    });

    var fakeTransition = {
      redirect: function(to, params, query) {
        expect(params).toEqual(expectedParams);
        expect(query).toEqual(expectedQuery);
        done();
      }
    };

    descriptor.props.handler.willTransitionTo(fakeTransition, fakePathParams, fakePathQuery);
  });

});

