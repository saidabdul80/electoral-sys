<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Expenses;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpensesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $expenses = Expenses::paginate(20);
        $categories = Category::all();
        return Inertia::render('Expenses',['expenses'=>$expenses,'categories'=>$categories]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function deleteCategory(Request $request){
        Category::where('id',$request->get('id'))->delete();
        return true;
    }

    public function deleteExpense(Request $request){
        Expenses::where('id',$request->get('id'))->delete();
        return true;
    }

    public function saveCategory(Request $request){
        if($request->get('id') != ''){
            $event = $request->toArray();
            $id = $event['id'];
            unset($event['id']);
            Category::where('id',$id)->update($event);            
            return true;
            //return Inertia::render('event',$this->data());
        }else{
            $event = $request->toArray();            
            unset($event['id']);
            Category::insert($event);
            return true;
            //return Inertia::render('event',$this->data());
        }
    }

    public function saveExpense(Request $request){
        if($request->get('id') != ''){
            $event = $request->toArray();
            $id = $event['id'];
            unset($event['id']);
            Expenses::where('id',$id)->update($event);            
            return true;
            //return Inertia::render('event',$this->data());
        }else{
            $event = $request->toArray();            
            unset($event['id']);
            Expenses::insert($event);
            return true;
            //return Inertia::render('event',$this->data());
        }
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Expenses  $expenses
     * @return \Illuminate\Http\Response
     */
    public function show(Expenses $expenses)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Expenses  $expenses
     * @return \Illuminate\Http\Response
     */
    public function edit(Expenses $expenses)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Expenses  $expenses
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Expenses $expenses)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Expenses  $expenses
     * @return \Illuminate\Http\Response
     */
    public function destroy(Expenses $expenses)
    {
        //
    }
}
