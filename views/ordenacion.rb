require 'benchmark'
include Benchmark

class Array
  NUM_ALIMENTOS = 5
  def burbuja_for (array)
     #n=a.length
     a = Array.new
     a = array
     for i in 0...a.length-1
      for j in 0...a.length-i-1
          if a[j]>a[j+1]
              temp=a[j]
              a[j]=a[j+1]
              a[j+1]=temp
          end
      end
     end
     return a
  end


  def burbuja_each (a)
  		tmp = 0
      array = Array.new
      array = a
      # nuevo = new.Array
      #array = array2.split(" ")
  	   	(0..array.length-1).each do |i|
  	   		(0..array.length-2).each do |j|
  	   			if(array[j] > array[j+1])
  	   				tmp = array[j]
  	   				array[j] = array[j+1]
  	   				array[j+1] = tmp
  	   			end
  	   		end
  	   	end
  	   	return array;
  	end
end




class Ordenacion < Array

NUM_ALIMENTOS = 5

def self.description
   "clase que muestra informacion de nutrientes de un Alimento"
end




attr_accessor :huevo_frito, :leche_de_vaca ,:yogurt ,:cerdo ,:ternera, :pollo ,:bacalao, :atun ,:salmon, :aceita_de_oliva ,:chocolate ,:azucar ,:arroz ,:lentejas, :papas, :tomate, :cebolla ,:manzana, :platano

def initialize ()

@huevo_frito= ['huevo frito',14.1,0.0,19.5]
@leche_de_vaca = ['leche de vaca',3.3,4.8,3.2]
@yogurt = ['yogurt',3.8,4.9,3.8]
@cerdo = ['cerdo',21.5,0.0,6.3]
@ternera = ['ternera',21.1,0.0,3.1]
@pollo= ['pollo',20.6,0.0,5.6]
@bacalao = ['bacalao',17.7,0.0,0.4]
@atun = ['atun',21.5,0.0,15.5]
@salmon = ['salmon',19.9,0.0,13.6]
#@aceita_de_oliva = ['aceita_de_oliva',0.0,0.2,99.6]
@chocolate = ['chocolate',5.3,47.0,30.0]
@azucar = ['azucar',0.0,99.8,0.0]
@arroz = ['arroz',6.8,77.7,0.6]
@lentejas = ['lentejas',23.5,52.0,1.4]
@papas = ['papas',2.0,15.4,0.1]
@tomate = ['tomate',1.0,3.5,0.2]
@cebolla = ['cebolla',1.3,5.8,0.3]
@manzana = ['manzana',0.3,12.4,0.4]
@platano = ['platano',1.2,21.4,0.2]

@alimentos = [@huevo_frito,@leche_de_vaca,@yogurt,@cerdo,@ternera,@pollo,@bacalao,@atun,@salmon,@chocolate,@azucar,@arroz,@lentejas,@papas,@tomate,@cebolla,@manzana,@platano]
@alimentor = [@huevo_frito,@leche_de_vaca,@yogurt,@cerdo,@ternera,@pollo,@bacalao]
@prueba_extrema = [999999,88888888,777777777,6666666,5555555,4444444,33333,22222,11111]
@prueba_extrema2 = [9,8,7,6,5,4,3,2,1]
end




  def calculo_calorias

    i = 0
variable = []
    r = []
    #each_byte
result = []
#a = [[11111,222222,33333333],[4444,5555,6666],[7777,88888,99999]]
    @alimentor.each_with_index do |alimento,i|
    #puts "#{valor} at #{i}"

    #i.to_f
    #j=0
    # s=[]
    # alimento.each_with_index do |detalles,j|

#alimento.each_with_index do |valores,j|
    result << (alimento[1]*4.0) + (alimento[2]*4.0) + (alimento[3]*9.0)

 #variable << result


    #ends

  end
  return (result)
#puts (variable)

#result
  #  end

#result
  end




  def to_s

    i = 0
    j = 0
variable = []
    r = []
    #each_byte
result = ""
#a = [[11111,222222,33333333],[4444,5555,6666],[7777,88888,99999]]
    for i in 0...@alimentos.length-1
      for j in 0...@alimentos.length-1

    result << "#{@alimentos[i][j]}"
    result << " "

#puts (alimento)
 #variable << result

 # def to_s
 #   s =  ""    #encadenamiento (chaining)
 #   s << "#{@tipo_ali}\n"
 #   s << super.to_s
 #   s
    #ends
end
result << "\n"
  end
  return (result)

  end









# def burbuja_for (a)
#    #n=a.length
#    for i in 0...NUM_ALIMENTOS-1
#     for j in 0...NUM_ALIMENTOS-i-1
#         if a[j]>a[j+1]
#             temp=a[j]
#             a[j]=a[j+1]
#             a[j+1]=temp
#         end
#     end
#    end
#    return a
# end
#
#
# def burbuja_each (array)
# 		tmp = 0
#     #array = array2.split(" ")
# 	   	(0..array.length-1).each do |i|
# 	   		(0..array.length-2).each do |j|
# 	   			if(array[j] > array[j+1])
# 	   				tmp = array[j]
# 	   				array[j] = array[j+1]
# 	   				array[j+1] = tmp
# 	   			end
# 	   		end
# 	   	end
# 	   	return array;
# 	end





# def burbuja_each (a)
#    #n=a.length
# i = 0
#
#     a.each_with_index do |dato1,i|
#       j = 0
#    a.each_with_index do |dato2,j|
# #puts (a[j])
#         if (a[j] > a[j+1])
#             temp = a[j]
#             a[j] = a[j+1]
#             a[j+1] = temp
#             puts (temp)
#
#         end
#
#     end
#
#    end
#    return a
# end

# def bubble_sort (array)
#   array.each do
#     swap_count = 0
#     array.each_with_index do |a, index|
#       break if index == (array.length - 1)
#       if a > array[index+1]
#         array[index],array[index+1] = array[index +1], array[index]
#         swap_count += 1
#       end
#     end
#     break if swap_count == 0 # this means it's ordered
#   end
#   array
# end


# Enclose the code into a function, for easier reuse.
# def bubble_sort(array)
#   sorted = false
#   # "sorted" is boolean; there is no need to compare it with true or false
#   until sorted
#     swapped = false
#     array.each_with_index do |x,i|
#       # exit the loop when the last item is reached
#       break if i == array.length - 1
#
#       if array[i] > array[i+1]
#         array[i], array[i+1] = array[i+1], array[i]
#         swapped = true
#       end
#     end
#     # Boolean logic: it's sorted when no more items were swapped
#     sorted = ! swapped
#   end
#   # Return the updated array
#   array
# end
# def bubble_sort(array)
#   @swap_needed = false
#   array.each_with_index do |val, idx|
#     a = val
#     b = array[idx + 1]
#
#     if !b.nil? && a > b
#       @swap_needed = true
#       array[idx] = b
#       array[idx + 1] = a
#     end
#   end
#   @swap_needed ? bubble_sort(array) : array
# end



end #class
#@a = []
@prueba = Ordenacion.new
puts ('************* ELEMENTOS SIN ORDENAR *********************************')

@a = @prueba.calculo_calorias
#@a.to_a
p(@a)

puts ('**************** ELEMENTOS ORDENADOS CON BUCLE FOR ********************')
@b = @prueba.burbuja_for(@a)
p(@b)

puts ('************** ELEMENTOS ORDENADOS CON BUCLE EACH ******************************')
@b = @prueba.burbuja_each(@a)
p(@b)

puts ('***************** ELEMENTOS ORDENADOS METODO SORT ****************')
@b = @a.sort
p(@b)

@texto = @prueba.to_s
puts(@texto)




Benchmark.benchmark(CAPTION, 7, FORMAT, ">total:", ">avg:") do |x|
  tf = x.report("con bucle for")   { @prueba.burbuja_for(@a) }
  tf = x.report("con bucle each")   { @prueba.burbuja_each(@a) }
  tf = x.report("con metodo sort")   { @a.sort }
end

# array = [10, 9, 8, 7, 6 ,5 ,4]
#
# sorted = false
#
# until sorted == true
#   swapped = false
#
#   array.each_with_index do |x, i|
#     if i <= array.length - 2
#       if array[i] > array[i + 1]
#         array[i], array[i + 1] = array[i + 1], array[i]
#         swapped = true
#       end
#     end
#
#     if swapped == false
#       sorted = true
#     end
#   end
# end
#
# print array

#puts (@a)

# array = [10, 9, 8, 7, 6 ,5 ,4]
# array = [999999.4, 88888888.5, 777777777.4, 6666666.3, 5555555.3, 4444444.3, 33333.5, 22222.4, 11111.3]
# array.each_index do |first|
#   array.each_index do |second|
#  if array[first] < array[second]
#       array[first], array[second] = array[second], array[first]
#     end
#   end
# end
#
# p array
