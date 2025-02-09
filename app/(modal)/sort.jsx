import { View, Text, FlatList } from "react-native";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { router, useLocalSearchParams } from "expo-router";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Sort from "../../constants/Sort.json";

const sort = () => {
  const { currentSort = "closest" } = useLocalSearchParams();
  const [selectedSort, setSelectedSort] = useState(currentSort);
  return (
    <View className="flex-1 bg-white p-4">
      <FlatList
        data={Sort}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => (
          <View className="flex-row justify-between mb-6 border-b-[0.5px] border-[#7D7D7D50] py-3">
            <Text className={`${selectedSort === item.value ? "text-primary" : "text-zinc-700"} text-lg font-rmedium`}>
              {item.name}
            </Text>
            <BouncyCheckbox
              size={23}
              fillColor="#154C79"
              unfillColor="white"
              iconStyle={{ borderColor: "#154C79", borderRadius: 4 }}
              innerIconStyle={{ borderRadius: 4, borderColor: "#7D7D7D" }}
              isChecked={selectedSort === item.value}
              onPress={() => setSelectedSort(item.value)}
            />
          </View>
        )}
      />

      <View
        className="absolute bottom-0 left-0 right-0 h-[100px] justify-items-start items-center bg-[#F2F2F2] py-3"
        style={{
          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: -10 },
        }}
      >
        <CustomButton
          title="Done"
          containerStyle="bg-primary rounded-xl justify-center items-center min-h-[55px] w-[95%]"
          textStyle={"text-white font-rmedium text-[18px]"}
          handlePress={() => {
            router.replace({ pathname: "/home", params: { sortOption: selectedSort } });
          }}
        />
      </View>
    </View>
  );
};

export default sort;