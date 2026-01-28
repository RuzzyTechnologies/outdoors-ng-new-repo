export const schema = {
  "admin_users": {
    "columns": [
      "user_id",
      "username",
      "firstname",
      "lastname",
      "email",
      "password",
      "image",
      "user_level",
      "added_by",
      "user_status",
      "date_created",
      "last_login",
      "date_updated"
    ],
    "primary_key": [
      "user_id"
    ],
    "auto_increment": [
      "user_id"
    ]
  },
  "billboards": {
    "columns": [
      "id",
      "title",
      "description",
      "location",
      "state",
      "city",
      "area",
      "address",
      "price",
      "size",
      "width",
      "height",
      "type",
      "category",
      "status",
      "image_url",
      "images",
      "featured",
      "latitude",
      "longitude",
      "visibility",
      "traffic_count",
      "illuminated",
      "created_at",
      "updated_at"
    ],
    "primary_key": [
      "id"
    ],
    "auto_increment": [
      "id"
    ]
  },
  "category": {
    "columns": [
      "category_id",
      "parent_id",
      "name",
      "url",
      "date_added",
      "date_updated",
      "category"
    ],
    "primary_key": [
      "category_id"
    ],
    "auto_increment": [
      "category_id"
    ]
  },
  "category_product": {
    "columns": [
      "category_product_id",
      "category_id",
      "product_id",
      "date_created",
      "date_updated"
    ],
    "primary_key": [
      "category_product_id"
    ],
    "auto_increment": [
      "category_product_id"
    ]
  },
  "deployment": {
    "columns": [
      "id",
      "subject",
      "message",
      "user_id",
      "date_created"
    ],
    "primary_key": [
      "id"
    ],
    "auto_increment": [
      "id"
    ]
  },
  "emails": {
    "columns": [
      "ID",
      "EmailAddress",
      "Status",
      "Time"
    ],
    "primary_key": [
      "ID"
    ],
    "auto_increment": [
      "ID"
    ]
  },
  "guest_users": {
    "columns": [
      "id",
      "email",
      "phone"
    ],
    "primary_key": [
      "id"
    ],
    "auto_increment": [
      "id"
    ]
  },
  "installation": {
    "columns": [
      "id",
      "user_id",
      "subject",
      "message",
      "date_created"
    ],
    "primary_key": [
      "id"
    ],
    "auto_increment": [
      "id"
    ]
  },
  "monitoring": {
    "columns": [
      "id",
      "user_id",
      "user_email",
      "name",
      "image",
      "gps",
      "location",
      "reminder_frequency",
      "expiration",
      "curr_client",
      "message",
      "status",
      "date_created"
    ],
    "primary_key": [
      "id"
    ],
    "auto_increment": [
      "id"
    ]
  },
  "paid_monitoring": {
    "columns": [
      "id",
      "user_id",
      "user_email",
      "name",
      "image",
      "gps",
      "location",
      "reminder_frequency",
      "expiration",
      "curr_client",
      "message",
      "status",
      "date_created"
    ],
    "primary_key": [
      "id"
    ],
    "auto_increment": [
      "id"
    ]
  },
  "paid_quotes": {
    "columns": [
      "id",
      "product_id",
      "member_id",
      "invoice",
      "status",
      "history",
      "date_created"
    ],
    "primary_key": [
      "id"
    ],
    "auto_increment": [
      "id"
    ]
  },
  "paid_quotes_chat": {
    "columns": [
      "id",
      "member_id",
      "product_id",
      "message",
      "title",
      "purpose",
      "sender",
      "price",
      "invoice",
      "date_available",
      "date_ended",
      "date_created"
    ],
    "primary_key": [
      "id"
    ],
    "auto_increment": [
      "id"
    ]
  },
  "print": {
    "columns": [
      "id",
      "user_id",
      "title",
      "message",
      "image",
      "date_created"
    ],
    "primary_key": [
      "id"
    ],
    "auto_increment": [
      "id"
    ]
  },
  "product": {
    "columns": [
      "product_id",
      "name",
      "url",
      "price",
      "category_id",
      "shop_id",
      "quantity",
      "viewed",
      "sku",
      "exp_date",
      "weight",
      "discount",
      "tax",
      "out_of_stock_display",
      "status",
      "product_status",
      "size",
      "gps_location",
      "address",
      "state",
      "state_area",
      "long_desc",
      "short_desc",
      "meta_title",
      "meta_description",
      "meta_keyword",
      "date_added",
      "date_updated",
      "special",
      "product_related_id",
      "profit"
    ],
    "primary_key": [
      "product_id"
    ],
    "auto_increment": [
      "product_id"
    ]
  },
  "product_images": {
    "columns": [
      "image_id",
      "product_id",
      "name",
      "default",
      "date_created",
      "date_updated"
    ],
    "primary_key": [
      "image_id"
    ],
    "auto_increment": [
      "image_id"
    ]
  },
  "quotes": {
    "columns": [
      "id",
      "product_id",
      "member_id",
      "invoice",
      "status",
      "history",
      "date_created"
    ],
    "primary_key": [
      "id"
    ],
    "auto_increment": [
      "id"
    ]
  },
  "quotes_chat": {
    "columns": [
      "id",
      "member_id",
      "product_id",
      "message",
      "title",
      "purpose",
      "sender",
      "price",
      "invoice",
      "date_available",
      "date_ended",
      "date_created"
    ],
    "primary_key": [
      "id"
    ],
    "auto_increment": [
      "id"
    ]
  },
  "state": {
    "columns": [
      "state_id",
      "state_name",
      "date_added",
      "date_updated"
    ],
    "primary_key": [
      "state_id"
    ],
    "auto_increment": [
      "state_id"
    ]
  },
  "state_area": {
    "columns": [
      "state_area_id",
      "state_id",
      "area_name",
      "date_added",
      "date_updated"
    ],
    "primary_key": [
      "state_area_id"
    ],
    "auto_increment": [
      "state_area_id"
    ]
  },
  "users": {
    "columns": [
      "user_id",
      "fullname",
      "firstname",
      "lastname",
      "email",
      "phone",
      "address",
      "postal_code",
      "status",
      "state",
      "country",
      "city",
      "password",
      "date_created",
      "last_login",
      "date_updated"
    ],
    "primary_key": [
      "user_id"
    ],
    "auto_increment": [
      "user_id"
    ]
  }
} as const;
export type TableName = keyof typeof schema;
