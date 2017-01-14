'use strict';

const rfc2234Grammar = require('./rfc2234-grammar');

const scheme = {
  $and: [{
    $token: rfc2234Grammar.ALPHA
  }, {
    $quantifier: '*',
    $or: [{
      $token: rfc2234Grammar.ALPHA
    }, {
      $token: rfc2234Grammar.DIGIT
    }, {
      $literal: '+'
    }, {
      $literal: '-'
    }, {
      $literal: '.'
    }]
  }]
};

const pctEncoded = {
  $and: [{
    $literal: '%'
  }, {
    $token: rfc2234Grammar.HEXDIG
  }, {
    $token: rfc2234Grammar.HEXDIG
  }]
};

const unreserved = {
  $or: [{
    $token: rfc2234Grammar.ALPHA
  }, {
    $token: rfc2234Grammar.DIGIT
  }, {
    $literal: '-'
  }, {
    $literal: '.'
  }, {
    $literal: '_'
  }, {
    $literal: '~'
  }]
};

const subDelims = {
  $or: [{
    $literal: '!'
  }, {
    $literal: '$'
  }, {
    $literal: '&'
  }, {
    $literal: '\''
  }, {
    $literal: '('
  }, {
    $literal: ')'
  }, {
    $literal: '*'
  }, {
    $literal: '+'
  }, {
    $literal: ','
  }, {
    $literal: ';'
  }, {
    $literal: '='
  }]
};

const pchar = {
  $or: [{
    $token: unreserved
  }, {
    $token: pctEncoded
  }, {
    $token: subDelims
  }, {
    $literal: ':'
  }, {
    $literal: '@'
  }]
};

const userinfo = {
  $quantifier: '*',
  $or: [{
    $token: unreserved
  }, {
    $token: pctEncoded
  }, {
    $token: subDelims
  }, {
    $literal: ':'
  }]
};

const h16 = {
  $quantifier: '1*4',
  $token: rfc2234Grammar.HEXDIG
};

const decOctet = {
  $or: [{
    $token: rfc2234Grammar.DIGIT
  }, {
    $and: [{
      $range: {
        from: '1',
        to: '9'
      }
    }, {
      $token: rfc2234Grammar.DIGIT
    }]
  }, {
    $and: [{
      $literal: '1'
    }, {
      $quantifier: '2',
      $token: rfc2234Grammar.DIGIT
    }]
  }, {
    $and: [{
      $literal: '2'
    }, {
      $range: {
        from: '0',
        to: '4'
      }
    }, {
      $quantifier: '2',
      $token: rfc2234Grammar.DIGIT
    }]
  }, {
    $and: [{
      $literal: '25'
    }, {
      $range: {
        from: '0',
        to: '5'
      }
    }]
  }]
};

const IPv4address = {
  $and: [{
    $token: decOctet
  }, {
    $literal: '.'
  }, {
    $token: decOctet
  }, {
    $literal: '.'
  }, {
    $token: decOctet
  }, {
    $literal: '.'
  }, {
    $token: decOctet
  }]
};

const ls32 = {
  $or: [{
    $and: [{
      $token: h16
    }, {
      $literal: ':'
    }, {
      $token: h16
    }]
  }, {
    $token: IPv4address
  }]
};

const IPv6address = {
  $or: [{
    $and: [{
      $quantifier: '6',
      $and: [{
        $token: h16
      }, {
        $literal: ':'
      }]
    }, {
      $token: ls32
    }]
  }, {
    $and: [{
      $literal: '::'
    }, {
      $quantifier: '5',
      $and: [{
        $token: h16
      }, {
        $literal: ':'
      }]
    }, {
      $token: ls32
    }]
  }, {
    $and: [{
      $quantifier: '?',
      $token: h16
    }, {
      $literal: '::'
    }, {
      $quantifier: '4',
      $and: [{
        $token: h16
      }, {
        $literal: ':'
      }]
    }, {
      $token: ls32
    }]
  }, {
    $and: [{
      $quantifier: '?',
      $and: [{
        $quantifier: '*1',
        $and: [{
          $token: h16
        }, {
          $literal: ':'
        }]
      }, {
        $token: h16
      }]
    }, {
      $literal: '::'
    }, {
      $quantifier: '3',
      $and: [{
        $token: h16
      }, {
        $literal: ':'
      }]
    }, {
      $token: ls32
    }]
  }, {
    $and: [{
      $quantifier: '?',
      $and: [{
        $quantifier: '*2',
        $and: [{
          $token: h16
        }, {
          $literal: ':'
        }]
      }, {
        $token: h16
      }]
    }, {
      $literal: '::'
    }, {
      $quantifier: '2',
      $and: [{
        $token: h16
      }, {
        $literal: ':'
      }]
    }, {
      $token: ls32
    }]
  }, {
    $and: [{
      $quantifier: '?',
      $and: [{
        $quantifier: '*3',
        $and: [{
          $token: h16
        }, {
          $literal: ':'
        }]
      }, {
        $token: h16
      }]
    }, {
      $literal: '::'
    }, {
      $and: [{
        $token: h16
      }, {
        $literal: ':'
      }]
    }, {
      $token: ls32
    }]
  }, {
    $and: [{
      $quantifier: '?',
      $and: [{
        $quantifier: '*4',
        $and: [{
          $token: h16
        }, {
          $literal: ':'
        }]
      }, {
        $token: h16
      }]
    }, {
      $literal: '::'
    }, {
      $token: ls32
    }]
  }, {
    $and: [{
      $quantifier: '?',
      $and: [{
        $quantifier: '*5',
        $and: [{
          $token: h16
        }, {
          $literal: ':'
        }]
      }, {
        $token: h16
      }]
    }, {
      $literal: '::'
    }, {
      $token: h16
    }]
  }, {
    $and: [{
      $quantifier: '?',
      $and: [{
        $quantifier: '*6',
        $and: [{
          $token: h16
        }, {
          $literal: ':'
        }]
      }, {
        $token: h16
      }]
    }, {
      $literal: '::'
    }]
  }]
};

const IPvFuture = {
  $and: [{
    $literal: 'v'
  }, {
    $quantifier: '1*',
    $token: rfc2234Grammar.HEXDIG
  }, {
    $literal: '.'
  }, {
    $quantifier: '1*',
    $or: [{
      $token: unreserved
    }, {
      $token: subDelims
    }, {
      $literal: ':'
    }]
  }]
};

const IPliteral = {
  $and: [{
    $literal: '['
  }, {
    $or: [{
      $token: IPv6address
    }, {
      $token: IPvFuture
    }]
  }, {
    $literal: ']'
  }]
};

const regName = {
  $quantifier: '*',
  $or: [{
    $token: unreserved
  }, {
    $token: pctEncoded
  }, {
    $token: subDelims
  }]
};

const host = {
  $or: [{
    $token: IPliteral
  }, {
    $token: IPv4address
  }, {
    $token: regName
  }]
};

const port = {
  $quantifier: '*',
  $token: rfc2234Grammar.DIGIT
};

const authority = {
  $and: [{
    $quantifier: '?',
    $and: [{
      $token: userinfo
    }, {
      $literal: '@'
    }]
  }, {
    $token: host
  }, {
    $quantifier: '?',
    $and: [{
      $literal: ':'
    }, {
      $token: port
    }]
  }]
};

const segment = {
  $quantifier: '*',
  $token: pchar
};

const segmentNz = {
  $quantifier: '+',
  $token: pchar
};

const pathAbempty = {
  $quantifier: '*',
  $and: [{
    $literal: '/'
  }, {
    $token: segment
  }]
};

const pathAbsolute = {
  $and: [{
    $literal: '/'
  }, {
    $quantifier: '?',
    $and: [{
      $token: segmentNz
    }, {
      $quantifier: '*',
      $and: [{
        $literal: '/'
      }, {
        $token: segment
      }]
    }]
  }]
};

const pathRootless = {
  $and: [{
    $token: segmentNz
  }, {
    $quantifier: '*',
    $and: [{
      $literal: '/'
    }, {
      $token: segment
    }]
  }]
};

const pathEmpty = {
  $quantifier: '0',
  $literal: ''
};

const hierPart = {
  $and: [{
    $literal: '//'
  }, {
    $token: authority
  }, {
    $or: [{
      $token: pathAbempty
    }, {
      $token: pathAbsolute
    }, {
      $token: pathRootless
    }, {
      $token: pathEmpty
    }]
  }]
};

const query = {
  $quantifier: '*',
  $or: [{
    $token: pchar
  }, {
    $literal: '/'
  }, {
    $literal: '?'
  }]
};

const fragment = {
  $quantifier: '*',
  $or: [{
    $token: pchar
  }, {
    $literal: '/'
  }, {
    $literal: '?'
  }]
};

const URI = {
  $and: [{
    $token: scheme
  }, {
    $literal: ':'
  }, {
    $token: hierPart
  }, {
    $quantifier: '?',
    $and: [{
      $literal: '?'
    }, {
      $token: query
    }]
  }, {
    $quantifier: '?',
    $and: [{
      $literal: '#'
    }, {
      $token: fragment
    }]
  }]
};

module.exports = {
  scheme,
  pctEncoded,
  unreserved,
  subDelims,
  pchar,
  userinfo,
  h16,
  decOctet,
  IPv4address,
  ls32,
  IPv6address,
  IPvFuture,
  IPliteral,
  regName,
  host,
  port,
  authority,
  segment,
  segmentNz,
  pathAbempty,
  pathAbsolute,
  pathRootless,
  pathEmpty,
  hierPart,
  query,
  fragment,
  URI
};
