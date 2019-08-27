import React from "react";
import QueryBuilder from "../queryBuilder/queryBuilder.jsx";
const queryBuilder = new QueryBuilder();

export default class AssertionData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query2: {
        type: "ConditionGroup",
        operator: "AND",
        children: [
          {
            type: "Condition",
            operator: "",
            leftOperand: "",
            rightOperand: ""
          }
        ]
      }
    };
  }

  onQuery2Update = (evt, queryBuilder) => {
    this.setState({
      query2: queryBuilder.getQuery()
    });
  };

  updateString = e => {
    const { key, name, value } = e.target;
    const query = { ...this.state.query2 };
    
    
    query.children.map((i, index) => {
        i[name] = value;
    });
    

    this.setState({
      query2: { ...query }
    });

  };

  addGroup = () =>{
    console.log('clicked')
  }

  handleSubmit = async (e, res, req) =>{
      e.preventDefault()
      console.log(this.state.query2.children[0].operator)

      const assertionString = {
        "executionName": "test",
        "template": {
        "templateId":"14fb5424-b3dd-11e9-a2a3-2a2ae2dbcce4",
        "userId":"1",
        "requestType":"get",
        "teamName":"QARTH",
        "createBy":"Sanjay",
        "serviceId":"85144022-b3dd-11e9-a2a3-2a2ae2dbcce4",
        "serviceConfigurationId":"789f4567-e89b-12d3-a456-426655441234",
        "httpUrlPathParams":"http://iro-webapp.stg0.iro.services.glb.prod.walmart.com/item-read-service/productOffers?rgs=PRODUCT_CONTENT,OFFER_PRODUCT,ITEM_PAGE_ASSET,OFFER_PRICE,OFFER_INVENTORY,ESTIMATED_SHIP_PRICE,VARIANT_SUMMARY",
        "dataFileId":"",
        "requestHeaders":"{\"WM_SVC.VERSION\":\"2.0.0\",\"WM_CONSUMER.IP\":\"127.0.0.1\",\"WM_SVC.ENV\":\"stg0\",\"WM_QOS.CORRELATION_ID\":\"-18006880586\",\"WM_SEC.AUTH_TOKEN\":\"AHHA\",\"WM_SVC.NAME\":\"item-read-service\",\"WM_CONSUMER.INTIMESTAMP\":\"1335916114312\"}",
        "requestBody":"{ \"productContexts\":[{\"productId\":{ \"productId\":\"4EFAXBN1F9VA\"  } }],\"postalAddress\":{\"addressLineOne\":\"850 CHERRY AVE\",\"district\":\"Alameda\",\"addressType\":\"OFFICE\",\"city\":\"San Bruno\",\"countryCode\":\"US\",\"stateOrProvinceName\":\"California\",\"stateOrProvinceCode\":\"CA\",\"isApoFpo\":false,\"isPoBox\":false,\"postalCode\":\"94588\"},\"storeFrontIds\":[{\"USStoreId\":2280}]}",
        "responseBody":"",
        "disabled":false,
        "assertions":[
           {
               "path":"payload.[0].productId.productId",
         "operator":"EQ" ,
         "expectedValue":"4EFAXBN1F9VA" ,
         "disableField":"false"
     
           }
        ],
        "inlineDataSets":[
           {
              "contextVariables":[
           {
              "name":"productId",
              "value":"4EFAXBN1F9VA"
           }
        ]
           }
        ],
        "datasets":[
           {
     
           }
        ],
        "contextVariables":[
           {
     
           }
        ],
        "modifiedBy":"Amruth"
     }}
    //   {
    //     "executionName":"test",
    //     "template":{
    //         "templateId":"14fb5424-b3dd-11e9-a2a3-2a2ae2dbcce4",
    //         "userId":"1",
    //         "requestType":"get",
    //         "teamName":"QARTH",
    //         "createBy":"Sanjay",
    //         "serviceId":"85144022-b3dd-11e9-a2a3-2a2ae2dbcce4",
    //         "serviceConfigurationId":"789f4567-e89b-12d3-a456-426655441234",
    //         "httpUrlPathParams":"http://iro-webapp.stg0.iro.services.glb.prod.walmart.com/item-read-service/productOffers?rgs=PRODUCT_CONTENT,OFFER_PRODUCT,ITEM_PAGE_ASSET,OFFER_PRICE,OFFER_INVENTORY,ESTIMATED_SHIP_PRICE,VARIANT_SUMMARY",
    //         "dataFileId":"",
    //         "requestHeaders":"{\"WM_SVC.VERSION\":\"2.0.0\",\"WM_CONSUMER.IP\":\"127.0.0.1\",\"WM_SVC.ENV\":\"stg0\",\"WM_QOS.CORRELATION_ID\":\"-18006880586\",\"WM_SEC.AUTH_TOKEN\":\"AHHA\",\"WM_SVC.NAME\":\"item-read-service\",\"WM_CONSUMER.INTIMESTAMP\":\"1335916114312\"}",
    //         "requestBody":"{ \"productContexts\":[{\"productId\":{ \"productId\":\"4EFAXBN1F9VA\"  } }],\"postalAddress\":{\"addressLineOne\":\"850 CHERRY AVE\",\"district\":\"Alameda\",\"addressType\":\"OFFICE\",\"city\":\"San Bruno\",\"countryCode\":\"US\",\"stateOrProvinceName\":\"California\",\"stateOrProvinceCode\":\"CA\",\"isApoFpo\":false,\"isPoBox\":false,\"postalCode\":\"94588\"},\"storeFrontIds\":[{\"USStoreId\":2280}]}",
    //         "responseBody":"",
    //         "disabled":false,
    //         "assertions":[
    //         {
    //             "path": this.state.query2.children[0].rightOperand,
    //             "operator":this.state.query2.children[0].operator ,
    //             "expectedValue": this.state.query2.children[0].rightOperand ,
    //             "disableField":"false"
    //         }
    //         ],
    //         "inlineDataSets":[
    //            {
    //       "contextVariables":[
    //            {
    //            "name":"productId",
    //             "value":"4EFAXBN1F9VA"
    //            }
    //         ]
    //         }
    //         ],
    //         "datasets":[
    //            {
 
    //            }
    //      ],
    //         "contextVariables":[
    //            {
 
    //            }
    //      ],
    //         "modifiedBy":"Amruth"
    //     }
    // }

    const reqData = JSON.stringify(assertionString)
      const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body: reqData
      }
  debugger
      return fetch('/api/assertions/execute', options)
        .then(response => { console.log(response) })
        .then(resp => console.log({resp}))
        .catch(err => console.error("Error in client:", { err }));

  }

  addCondition = () => {
    const children = [...this.state.query2.children];

    children.push({
      type: "Condition",
      operator: "",
      leftOperand: "",
      rightOperand: ""
    });

    const query = { ...this.state.query2 };
    query.children = [...children];

    this.setState({
      query2: { ...query }
    });
  };

  render() {
    var query2String = queryBuilder.queryToString(this.state.query2);
    return (
      <div className="queryBuilder">
        <QueryBuilder
          initialQuery={this.state.query2}
          onQueryUpdate={this.onQuery2Update}
          updateString={this.updateString}
          addCondition={this.addCondition}
          addGroup={this.addGroup}
        />
        <pre>{query2String}</pre>

        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
