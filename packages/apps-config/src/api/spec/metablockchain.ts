export default {
        "PeerId": "(Vec<>)",
          "identifier": "[u8;32]",
          "public_key": "[u8;32]",
          "metadata": "Vec<u8>",
          "issuer": "Option<[u8;32]>",
          "DidStruct": {
            "identifier": "identifier",
            "public_key": "public_key",
            "metadata": "metadata",
            "issuer": "issuer"
          },
          "DiDSignature": "[u8;64]",
         "VcTYPE": {
           "_enum": [
             "Add",
             "Update",
             "Remove",
             "Rotate"
           ]
         },
        "Did": "[u8;32]",
          "VcProperty": {
            "issuer": "Did",
            "vc_type": "VcTYPE"
          },
          "VcProperties": {
            "property": "VcProperty",
            "hash": "Hash",
            "signature": "DiDSignature"
          },
          "PublicKey": "[u8;32]",
          "Address": "MultiAddress",
          "LookupSource": "MultiAddress",
          "TreasuryProposal": {
            "proposer": "Did",
            "beneficiary": "Did",
            "value": "Balance",
            "bond": "Balance"
          },
          "CurrencyId": "i64",
          "Amount": "i64"
};
