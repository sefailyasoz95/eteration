import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./src/Stacks/AppStack";
import { StatusBar } from "expo-status-bar";

const App = () => {
	/*
		Öncelikle bu fırsat için teşekkürler. Benim için verimli geçen bir süreçti. Bilmediğim, yaparken öğrendiğim şeyler oldu.
		uygulamanın bazı yerlerine yorum satırları bıraktım. Bu noktalarla ilgili, seçilsem de seçilmesem de sizlerden 
		geri dönüş alabilirsem çok sevinirim.

		Daha önce test yazmayla ilgili çok az, 1-2 bu tarz study caseler de tecrübem oldu.
		2 günde araştırıp bulduğum kadarıyla testleri yazdım. Daha iyisini ve fazlasını öğrenip yapabileceğimden şüphem yok.
		Ayrıca TypeScript kullanarak yazdığım ilk proje bu, önceki projelerim hep JavaScript ile idi.

		Yapıyı daha karmaşık hale getirmemek adına global state, context kullanmadım. 
	*/
	return (
		<NavigationContainer>
			<AppStack />
			<StatusBar style='auto' />
		</NavigationContainer>
	);
};

export default App;
