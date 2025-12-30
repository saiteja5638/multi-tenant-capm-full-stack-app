context vcp_sales_orders {
  entity LOCATION {
    key LOCATION_ID    : String(4)      @title: 'Location ';
        LOCATION_DESC  : String(30)     @title: 'Location Description';
        LOCATION_TYPE  : String(1)      @title: 'Location Type';
        LATITUDE       : Decimal(10, 8) @title: 'Latitude';
        LONGITUTE      : Decimal(10, 8) @title: 'Longitude';
        RESERVE_FIELD1 : String(40)     @title: 'Reserve Field1';
        RESERVE_FIELD2 : String(40)     @title: 'Reserve Field2';
        RESERVE_FIELD3 : String(40)     @title: 'Reserve Field3';
        RESERVE_FIELD4 : String(40)     @title: 'Reserve Field4';
        RESERVE_FIELD5 : String(40)     @title: 'Reserve Field5';
        AUTH_GROUP     : String(4)      @title: 'Authorization Group';
  };

  entity LOCATION_STB {
    key LOCATION_ID    : String(4)      @title: 'Location ';
        LOCATION_DESC  : String(30)     @title: 'Location Description';
        LOCATION_TYPE  : String(1)      @title: 'Location Type';
        LATITUDE       : Decimal(10, 8) @title: 'Latitude';
        LONGITUTE      : Decimal(10, 8) @title: 'Longitude';
        RESERVE_FIELD1 : String(40)     @title: 'Reserve Field1';
        RESERVE_FIELD2 : String(40)     @title: 'Reserve Field2';
        RESERVE_FIELD3 : String(40)     @title: 'Reserve Field3';
        RESERVE_FIELD4 : String(40)     @title: 'Reserve Field4';
        RESERVE_FIELD5 : String(40)     @title: 'Reserve Field5';
        AUTH_GROUP     : String(4)      @title: 'Authorization Group';
  };

  type LOCATION1 {
    LOCATION_ID    : String(4)      @title: 'Location ';
    LOCATION_DESC  : String(30)     @title: 'Location Description';
    LOCATION_TYPE  : String(1)      @title: 'Location Type';
    LATITUDE       : Decimal(10, 8) @title: 'Latitude';
    LONGITUTE      : Decimal(10, 8) @title: 'Longitude';
    RESERVE_FIELD1 : String(40)     @title: 'Reserve Field1';
    RESERVE_FIELD2 : String(40)     @title: 'Reserve Field2';
    RESERVE_FIELD3 : String(40)     @title: 'Reserve Field3';
    RESERVE_FIELD4 : String(40)     @title: 'Reserve Field4';
    RESERVE_FIELD5 : String(40)     @title: 'Reserve Field5';
    AUTH_GROUP     : String(4)      @title: 'Authorization Group';
  };


  // --- Customer Master ---
  entity Customers {
    key ID         : UUID @title: 'Customer ID';
        name       : String(100);
        email      : String(100);
        phone      : String(20);
        address    : String(255);
        city       : String(100);
        country    : String(100);
        createdAt  : Timestamp;
        createdBy  : String(50);
        modifiedAt : Timestamp;
        modifiedBy : String(50);
  }

  // --- Product Master ---
  entity Products {
    key ID            : UUID @title: 'Product ID';
        name          : String(100);
        description   : String(255);
        category      : String(50);
        price         : Decimal(15, 2);
        currency      : String(3);
        stockQuantity : Integer;
        createdAt     : Timestamp;
        createdBy     : String(50);
        modifiedAt    : Timestamp;
        modifiedBy    : String(50);
  }

  // --- Sales Orders ---


  entity JOB_LOGS {
    key name        : String;
        description : String;
        active      : Boolean;
        httpMethod  : String;
        action      : String;
  }


}
