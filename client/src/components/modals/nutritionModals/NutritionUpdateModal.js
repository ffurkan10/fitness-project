import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useScrollLock } from '../../../hooks/useScrollLock';
import { showModal } from '../../../features/modal/ModalSlice';
import Button from '../../ui/buttons/Button';
import InputText from '../../ui/inputs/InputText';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { getUserNutrition, updateNutrition } from '../../../features/nutrition/NutritionSlice';

const NutritionUpdateModal = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { modalLocation } = useSelector((state) => state.modal);
    const { selectedUser } = useSelector((state) => state.users);
    const {userNutrition} = useSelector((state) => state.nutrition);
    const { lockScroll, unlockScroll } = useScrollLock();

    useEffect(() => {
        dispatch(getUserNutrition(selectedUser._id));
    }, [])

    const [data, setData] = useState({
        totalKcal: '',
        totalProtein: '',
        totalCarbs: '',
        totalOil: ''
    });

    const [mealsByTime, setMealsByTime] = useState([]);

    useEffect(() => {
        if (userNutrition) {
            setData({
                totalKcal: userNutrition.totalKcal,
                totalProtein: userNutrition.totalProtein,
                totalCarbs: userNutrition.totalCarbs,
                totalOil: userNutrition.totalOil
            });
            setMealsByTime(userNutrition.mealsByTime);
        }
    }, [userNutrition])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const addMealByTime = () => {
        setMealsByTime((prev) => [
            ...prev,
            {
                title: '',
                meals: [
                {
                    id: 1,
                    name: '',
                    kcal: '',
                    scale: ''
                }
                ]
            }
        ]);
    };

    const addMeals = (index) => {
        setMealsByTime((prev) => {
            const updatedMealsByTime = prev.map((mealTime, i) => {
            if (i === index) {
                return {
                ...mealTime,
                meals: [
                    ...mealTime.meals,
                    {
                    id: mealTime.meals.length + 1,
                    name: '',
                    kcal: '',
                    scale: ''
                    }
                ]
                };
            }
            return mealTime;
            });

            return updatedMealsByTime;
        });
    };


    const removeMealByTime = (index) => {
        setMealsByTime((prev) => prev.filter((_, i) => i !== index));
    };

    const removeMeal = (timeIndex, mealIndex) => {
        setMealsByTime((prev) => {
            const updated = [...prev];
            updated[timeIndex].meals = updated[timeIndex].meals
            .filter((_, i) => i !== mealIndex)
            .map((meal, i) => ({ ...meal, id: i + 1 })); // id'leri sıfırlıyoruz
            return updated;
        });
    };


    useEffect(() => {
        lockScroll();
        return () => unlockScroll();
    }, [lockScroll, unlockScroll]);

    useEffect(() => {
        if (location.pathname !== modalLocation) {
            dispatch(showModal(null));
        }
    }, [dispatch, location.pathname, modalLocation]);

    const handleSubmit = () => {
        const submitData = {
            userId: selectedUser._id,
            ...data,
            mealsByTime
        };
        dispatch(updateNutrition(submitData))
    };

  return (
    <div
      onClick={() => dispatch(showModal(null))}
      className="fixed top-0 right-0 bottom-0 left-0 bg-modalBg flex justify-center items-center z-[9999] shadow-lg"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[600px] max-h-[90vh] p-5 rounded-lg flex flex-col justify-between items-center bg-white gap-5 overflow-y-auto"
      >
        <h2 className="text-dark text-xl font-bold mb-5">Beslenme Programı Ekle</h2>

        <div className="flex flex-col gap-4 w-full">
          <InputText
            data={data.totalKcal}
            setData={handleInputChange}
            name="totalKcal"
            width="100%"
            labelText="Toplam Kalori"
          />
          <InputText
            data={data.totalCarbs}
            setData={handleInputChange}
            name="totalCarbs"
            width="100%"
            labelText="Toplam Karbonhidrat"
          />
          <InputText
            data={data.totalProtein}
            setData={handleInputChange}
            name="totalProtein"
            width="100%"
            labelText="Toplam Protein"
          />
          <InputText
            data={data.totalOil}
            setData={handleInputChange}
            name="totalOil"
            width="100%"
            labelText="Toplam Yağ"
          />

          <div>
            <div className="text-dark text-lg font-semibold mb-2">Öğünler</div>
            {mealsByTime.map((mealTime, timeIndex) => (
              <div key={timeIndex} className="flex flex-col gap-2 mb-3 border-b-2 border-light pb-3">
                <InputText
                  data={mealTime.title}
                  setData={(e) => {
                    const updated = [...mealsByTime];
                    updated[timeIndex].title = e.target.value;
                    setMealsByTime(updated);
                  }}
                  name={`mealTitle-${timeIndex}`}
                  width="100%"
                  labelText="Öğün Başlığı"
                />

                {mealTime.meals.map((meal, mealIndex) => (
                  <div key={mealIndex} className="flex gap-2 items-end">
                    <InputText
                      data={meal.name}
                      setData={(e) => {
                        const updated = [...mealsByTime];
                        updated[timeIndex].meals[mealIndex].name = e.target.value;
                        setMealsByTime(updated);
                      }}
                      name={`mealName-${timeIndex}-${mealIndex}`}
                      width="100%"
                      labelText="Yemek Adı"
                    />
                    <InputText
                      data={meal.kcal}
                      setData={(e) => {
                        const updated = [...mealsByTime];
                        updated[timeIndex].meals[mealIndex].kcal = e.target.value;
                        setMealsByTime(updated);
                      }}
                      name={`mealKcal-${timeIndex}-${mealIndex}`}
                      width="100%"
                      labelText="Kalori"
                    />
                    <InputText
                      data={meal.scale}
                      setData={(e) => {
                        const updated = [...mealsByTime];
                        updated[timeIndex].meals[mealIndex].scale = e.target.value;
                        setMealsByTime(updated);
                      }}
                      name={`mealScale-${timeIndex}-${mealIndex}`}
                      width="100%"
                      labelText="Ölçek"
                    />
                    <button onClick={() => removeMeal(timeIndex, mealIndex)} className="text-red text-sm flex flex-col items-center gap-1">
                      <FaRegTrashAlt size={20} />
                    </button>
                  </div>
                ))}

                <div className="flex gap-3 mt-2">
                  <button onClick={() => addMeals(timeIndex)} className="text-green text-sm flex items-center gap-1">
                    <FaPlus /> Yemek Ekle
                  </button>
                  <button onClick={() => removeMealByTime(timeIndex)} className="text-red text-sm flex items-center gap-1">
                    <FaMinus /> Öğün Sil
                  </button>
                </div>
              </div>
            ))}

            <button onClick={addMealByTime} className="text-green text-md font-semibold flex items-center gap-1">
              <FaPlus /> Yeni Öğün Ekle
            </button>
          </div>
        </div>

        <div className="flex gap-4 w-full items-center justify-center mt-4">
          <Button width="150px" handleClick={handleSubmit} text="Ekle" />
          <Button width="150px" handleClick={() => dispatch(showModal(null))} text="Kapat" />
        </div>
      </div>
    </div>
  );
};

export default NutritionUpdateModal;
