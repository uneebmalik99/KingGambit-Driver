const renderCustomerlist = ({ item }) => {

    let c;
    if (customername == item.customer_name) {
      c = 1
    }
    return (

      <TouchableOpacity
        onPress={() => { setcustmodal(false); setcustomername(item.customer_name), 
            setcustomeruserid(item.user_id) }}
        style={{ marginVertical: 5, borderWidth: 0.5, flexDirection: 'row', 
        borderColor: 'grey', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 10, }}>

        {c == null ?
          <Ionicons name='ios-radio-button-off-sharp' color='grey' style={{ alignSelf: 'center' }} size={20} /> :
          <Ionicons name='ios-radio-button-on' color={AppColors.Signincolor} style={{ alignSelf: 'center' }} size={20} />
        }


        <Text style={{ alignSelf: 'center', color: AppColors.Signincolor, marginLeft: 5, }}>{item.customer_name}</Text>
        {/* {/ <Text>sfsdfn</Text> /} */}
      </TouchableOpacity>

    )

  }